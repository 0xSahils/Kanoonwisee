const ClientProfile = require("../models/clientProfile.model");
const User = require("../models/user.model");
const LawyerProfile = require("../models/lawyerProfile.model");
const Appointment = require("../models/appointment.model");
const Review = require("../models/review.model");
const { Op } = require("sequelize");
const sequelize = require("../config/database");

const getClientProfile = async (userId) => {
  return await ClientProfile.findOne({
    where: { user_id: userId },
    include: [{ model: User, attributes: ["email", "role"] }],
  });
};

const createOrUpdateClientProfile = async (userId, profileData) => {
  const existingProfile = await ClientProfile.findOne({
    where: { user_id: userId },
  });

  if (existingProfile) {
    await existingProfile.update(profileData);
    return existingProfile;
  } else {
    return await ClientProfile.create({ ...profileData, user_id: userId });
  }
};

const searchLawyers = async (filters = {}, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const whereClause = {};
  const andConditions = [];

  if (filters.specialization) {
    // Create a case-insensitive partial match for specialization
    const searchTerm = filters.specialization.toLowerCase();

    // Handle common variations (lawyer/law)
    const normalizedSearchTerm = searchTerm
      .replace(/lawyer/g, "law")
      .replace(/lawyers/g, "law")
      .trim();

    // Use PostgreSQL array_to_string for case-insensitive search
    andConditions.push({
      [Op.or]: [
        // Search in the array as string (case-insensitive)
        sequelize.where(
          sequelize.fn(
            "LOWER",
            sequelize.fn(
              "array_to_string",
              sequelize.col("specialization"),
              " "
            )
          ),
          Op.iLike,
          `%${searchTerm}%`
        ),
        // Search with normalized term
        sequelize.where(
          sequelize.fn(
            "LOWER",
            sequelize.fn(
              "array_to_string",
              sequelize.col("specialization"),
              " "
            )
          ),
          Op.iLike,
          `%${normalizedSearchTerm}%`
        ),
      ],
    });
  }

  if (filters.language) {
    andConditions.push({ languages: { [Op.contains]: [filters.language] } });
  }

  if (filters.city) {
    andConditions.push({ city: { [Op.iLike]: `%${filters.city}%` } });
  }

  if (filters.min_experience) {
    andConditions.push({
      years_experience: { [Op.gte]: parseInt(filters.min_experience) },
    });
  }

  // Combine all conditions with AND
  if (andConditions.length > 0) {
    whereClause[Op.and] = andConditions;
  }

  // Fee structure filtering
  if (filters.min_fee || filters.max_fee) {
    const feeFilter = {};
    if (filters.min_fee) {
      feeFilter[Op.gte] = filters.min_fee;
    }
    if (filters.max_fee) {
      feeFilter[Op.lte] = filters.max_fee;
    }

    andConditions.push(
      sequelize.where(
        sequelize.literal('CAST("fee_structure"->>\'consultation\' AS INTEGER)'),
        feeFilter
      )
    );
  }

  // First get lawyers with basic info (no aggregations)
  const lawyers = await LawyerProfile.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: User,
        attributes: ["email"],
      },
    ],
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });

  // Then get rating statistics for each lawyer separately and store for sorting
  const lawyersWithRatings = [];
  for (let lawyer of lawyers.rows) {
    // Get review statistics
    const reviewStats = await Review.findOne({
      where: { lawyer_id: lawyer.id },
      attributes: [
        [
          sequelize.fn(
            "COALESCE",
            sequelize.fn("AVG", sequelize.col("rating")),
            0
          ),
          "average_rating",
        ],
        [sequelize.fn("COUNT", sequelize.col("id")), "review_count"],
      ],
      raw: true,
    });

    // Apply minimum rating filter if specified
    if (
      filters.min_rating &&
      (!reviewStats?.average_rating ||
        reviewStats.average_rating < filters.min_rating)
    ) {
      // Skip this lawyer if it doesn't meet minimum rating
      continue;
    }

    // Add review stats to lawyer data
    lawyer.dataValues.average_rating = parseFloat(
      reviewStats?.average_rating || 0
    );
    lawyer.dataValues.review_count = parseInt(reviewStats?.review_count || 0);

    // Get available slots
    const availableSlots = await getAvailableSlots(lawyer.id, 3);
    lawyer.dataValues.available_slots = availableSlots;

    lawyersWithRatings.push(lawyer);
  }

  // Sort lawyers by rating in descending order (highest rating first)
  lawyersWithRatings.sort((a, b) => {
    const ratingA = a.dataValues.average_rating || 0;
    const ratingB = b.dataValues.average_rating || 0;

    // Sort by rating descending, then by review count descending as tiebreaker
    if (ratingB !== ratingA) {
      return ratingB - ratingA;
    }
    return (b.dataValues.review_count || 0) - (a.dataValues.review_count || 0);
  });

  // Update the lawyers object with sorted results
  lawyers.rows = lawyersWithRatings;
  lawyers.count = lawyersWithRatings.length;

  return {
    lawyers: lawyers.rows,
    total: lawyers.count,
    page,
    totalPages: Math.ceil(lawyers.count / limit),
  };
};

const getAllLawyers = async (page = 1, limit = 50) => {
  // Get all lawyers without any filters, sorted by rating
  return await searchLawyers({}, page, limit);
};

const getLawyerById = async (lawyerId) => {
  const lawyer = await LawyerProfile.findByPk(lawyerId, {
    include: [
      {
        model: User,
        attributes: ["email"],
      },
      {
        model: Review,
        include: [
          {
            model: ClientProfile,
            attributes: ["full_name"],
          },
        ],
        required: false,
      },
    ],
  });

  if (lawyer) {
    // Calculate rating statistics separately
    const reviewStats = await Review.findOne({
      where: { lawyer_id: lawyerId },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "average_rating"],
        [sequelize.fn("COUNT", sequelize.col("id")), "review_count"],
      ],
      raw: true,
    });

    // Add stats to lawyer data
    lawyer.dataValues.average_rating = reviewStats?.average_rating || 0;
    lawyer.dataValues.review_count = reviewStats?.review_count || 0;

    // Get available slots
    const availableSlots = await getAvailableSlots(lawyerId, 5);
    lawyer.dataValues.available_slots = availableSlots;

    // Get recent reviews with client names
    const recentReviews = await Review.findAll({
      where: { lawyer_id: lawyerId },
      include: [
        {
          model: ClientProfile,
          attributes: ["full_name"],
        },
      ],
      order: [["created_at", "DESC"]],
      limit: 10,
    });
    lawyer.dataValues.Reviews = recentReviews;
  }

  return lawyer;
};

const getAvailableSlots = async (lawyerId, limit = 3) => {
  // Get next 7 days of potential slots (9 AM to 6 PM, hourly)
  const slots = [];
  const now = new Date();

  for (let day = 0; day < 7; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() + day);

    for (let hour = 9; hour <= 18; hour++) {
      const slotTime = new Date(date);
      slotTime.setHours(hour, 0, 0, 0);

      if (slotTime > now) {
        slots.push(slotTime);
      }
    }
  }

  // Check which slots are already booked
  const bookedSlots = await Appointment.findAll({
    where: {
      lawyer_id: lawyerId,
      scheduled_time: {
        [Op.in]: slots,
      },
      status: {
        [Op.in]: ["pending", "accepted"],
      },
    },
    attributes: ["scheduled_time"],
  });

  const bookedTimes = bookedSlots.map((slot) => slot.scheduled_time.getTime());
  const availableSlots = slots
    .filter((slot) => !bookedTimes.includes(slot.getTime()))
    .slice(0, limit);

  return availableSlots;
};

const bookAppointment = async (clientId, appointmentData) => {
  // Check if slot is available
  const existingAppointment = await Appointment.findOne({
    where: {
      lawyer_id: appointmentData.lawyer_id,
      scheduled_time: appointmentData.scheduled_time,
      status: {
        [Op.in]: ["pending", "accepted"],
      },
    },
  });

  if (existingAppointment) {
    throw new Error("This time slot is already booked");
  }

  // Get lawyer details for fee
  const lawyer = await LawyerProfile.findByPk(appointmentData.lawyer_id);
  if (!lawyer) {
    throw new Error("Lawyer not found");
  }

  // Get client profile
  const clientProfile = await ClientProfile.findOne({
    where: { id: clientId },
  });
  if (!clientProfile) {
    throw new Error("Client profile not found");
  }

  const fee =
    appointmentData.consultation_type === "online"
      ? lawyer.fee_structure.consultation
      : lawyer.fee_structure.court;

  return await Appointment.create({
    ...appointmentData,
    client_id: clientId,
    client_name: clientProfile.full_name,
    fee,
    status: "pending",
  });
};

const getClientAppointments = async (clientId) => {
  return await Appointment.findAll({
    where: { client_id: clientId },
    include: [
      {
        model: LawyerProfile,
        attributes: [
          "full_name",
          "specialization",
          "fee_structure",
          "city",
          "years_experience",
        ],
        include: [
          {
            model: User,
            attributes: ["email"],
          },
        ],
      },
    ],
    order: [["scheduled_time", "DESC"]],
  });
};

const cancelAppointment = async (clientId, appointmentId) => {
  const appointment = await Appointment.findOne({
    where: {
      id: appointmentId,
      client_id: clientId,
      status: "pending",
    },
  });

  if (!appointment) {
    throw new Error("Appointment not found or cannot be cancelled");
  }

  await appointment.destroy();
  return { message: "Appointment cancelled successfully" };
};

module.exports = {
  getClientProfile,
  createOrUpdateClientProfile,
  searchLawyers,
  getAllLawyers,
  getLawyerById,
  bookAppointment,
  getClientAppointments,
  cancelAppointment,
};
