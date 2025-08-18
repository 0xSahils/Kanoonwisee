import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/landing/Header.jsx";
import Footer from "../../components/landing/Footer.jsx";

const SimpleBooking = () => {
  const { lawyerId } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { user } = useSelector((state) => state.auth);
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    consultation_type: "online",
    case_description: "",
    preferred_date: "",
    preferred_time: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/public/lawyers/${lawyerId}`
        );
        if (response.ok) {
          const data = await response.json();
          setLawyer(data);
        }
      } catch (error) {
        console.error("Error fetching lawyer:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lawyerId) {
      fetchLawyer();
    }
  }, [lawyerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate required fields
    if (!bookingData.preferred_date || !bookingData.preferred_time) {
      alert("Please select both date and time for your consultation.");
      setSubmitting(false);
      return;
    }

    if (!bookingData.case_description.trim()) {
      alert("Please provide a case description.");
      setSubmitting(false);
      return;
    }

    try {
      const bookingPayload = {
        lawyer_id: lawyerId,
        consultation_type: bookingData.consultation_type,
        case_description: bookingData.case_description,
        scheduled_time: new Date(
          `${bookingData.preferred_date}T${bookingData.preferred_time}:00`
        ).toISOString(),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/client/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(bookingPayload),
        }
      );

      if (response.ok) {
        alert(
          "Consultation booked successfully! The lawyer will confirm your appointment."
        );

        // Small delay to ensure authentication state is properly set before navigation
        setTimeout(() => {
          navigate("/client/appointments");
        }, 300);
      } else {
        const error = await response.json();
        console.error("Booking error:", error);
        alert(error.message || error.error || "Failed to book consultation");
      }
    } catch (error) {
      console.error("Error booking consultation:", error);
      alert("Failed to book consultation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom py-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Lawyer Not Found
            </h1>
            <button
              onClick={() => navigate("/search-lawyers")}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
            >
              Back to Search
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/search-lawyers")}
              className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Search
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Consultation
            </h1>
            <p className="text-gray-600">
              Schedule a consultation with {lawyer.full_name}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Lawyer Info */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <div className="text-center mb-6">
                  <img
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`}
                    alt={lawyer.full_name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {lawyer.full_name}
                  </h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star text-sm ${
                            i < Math.floor(lawyer.average_rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        ></i>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {Number(lawyer.average_rating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Specialization
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {lawyer.specialization?.map((spec, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Experience</div>
                    <div className="text-sm font-medium text-gray-900">
                      {lawyer.years_experience} years
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Location</div>
                    <div className="text-sm font-medium text-gray-900">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {lawyer.city}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      Consultation Fee
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      ₹{Number(lawyer.fee_structure?.consultation || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Consultation Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="consultation_type"
                          value="online"
                          checked={bookingData.consultation_type === "online"}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              consultation_type: e.target.value,
                            })
                          }
                          className="mr-2"
                        />
                        <span>Online</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="consultation_type"
                          value="offline"
                          checked={bookingData.consultation_type === "offline"}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              consultation_type: e.target.value,
                            })
                          }
                          className="mr-2"
                        />
                        <span>In-Person</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Description
                    </label>
                    <textarea
                      value={bookingData.case_description}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          case_description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Please describe your legal matter..."
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.preferred_date}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            preferred_date: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <select
                        value={bookingData.preferred_time}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            preferred_time: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="">Select Time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Booking Summary
                    </h3>
                    <div className="flex justify-between items-center">
                      <span>Consultation Fee:</span>
                      <span className="font-bold text-primary-600">
                        ₹{Number(lawyer.fee_structure?.consultation || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      * Payment will be collected after lawyer confirmation
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {submitting ? "Booking..." : "Book Consultation"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SimpleBooking;
