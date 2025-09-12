import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header.jsx";
import Footer from "../components/landing/Footer.jsx";
import axiosInstance from "../api/index";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch appointments when component mounts
    // Authentication is now handled by ProtectedRoute wrapper
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get("/client/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const cancelAppointment = async (appointmentId) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await axiosInstance.put(`/client/appointments/${appointmentId}/cancel`);
      toast.success("Appointment cancelled successfully");
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative navbar-spacing pb-16 bg-primary-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/calender-booking.png"
            alt="Appointments background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-4xl sm:text-5xl font-light mb-6">
              My <span className="text-yellow-500">Appointments</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Manage your legal consultations and track appointment status
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-calendar-alt text-yellow-600 text-xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {appointments.length}
                </div>
                <div className="text-gray-600">Total Appointments</div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {
                    appointments.filter((apt) => apt.status === "accepted")
                      .length
                  }
                </div>
                <div className="text-gray-600">Confirmed</div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-clock text-orange-600 text-xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {
                    appointments.filter((apt) => apt.status === "pending")
                      .length
                  }
                </div>
                <div className="text-gray-600">Pending</div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-history text-blue-600 text-xl"></i>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {
                    appointments.filter((apt) => apt.status === "completed")
                      .length
                  }
                </div>
                <div className="text-gray-600">Completed</div>
              </div>
            </div>

            {/* Appointments Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                My Appointments
              </h2>
              <p className="text-gray-600">
                Track and manage your legal consultations
              </p>
            </div>

            {/* Appointments List */}
            {appointments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="w-32 h-32 mx-auto mb-6">
                  <img
                    src="/empty-appointment.png"
                    alt="No appointments"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No appointments yet
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start your legal journey by booking your first consultation
                  with a verified lawyer
                </p>
                <button
                  onClick={() => navigate("/search-lawyers")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <i className="fas fa-search mr-2"></i>
                  Find Lawyers
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      {/* Appointment Info */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <img
                            src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face`}
                            alt={appointment.lawyer_name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {appointment.lawyer_name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span>
                                <i className="fas fa-calendar mr-1"></i>
                                {formatDate(appointment.scheduled_time)}
                              </span>
                              <span className="flex items-center">
                                <img
                                  src={
                                    appointment.consultation_type === "online"
                                      ? "/vedio consultation.png"
                                      : "/in-person-consultation.png"
                                  }
                                  alt={
                                    appointment.consultation_type === "online"
                                      ? "Video consultation"
                                      : "In-person consultation"
                                  }
                                  className="w-4 h-4 mr-1"
                                />
                                {appointment.consultation_type === "online"
                                  ? "Online"
                                  : "In-Person"}
                              </span>
                            </div>
                            {appointment.case_description && (
                              <p className="text-sm text-gray-700 mb-2">
                                <strong>Case:</strong>{" "}
                                {appointment.case_description}
                              </p>
                            )}
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                  appointment.status
                                )}`}
                              >
                                <img
                                  src={
                                    appointment.status === "accepted"
                                      ? "/appointment-comfirmed.png"
                                      : appointment.status === "cancelled"
                                      ? "/appointment-cancellef.png"
                                      : "/appointment-pending.png"
                                  }
                                  alt={appointment.status}
                                  className="w-3 h-3 mr-1"
                                />
                                {appointment.status.charAt(0).toUpperCase() +
                                  appointment.status.slice(1)}
                              </span>
                              {appointment.fee && (
                                <span className="text-sm font-medium text-primary-600">
                                  ₹
                                  {Number(
                                    appointment.fee || 0
                                  ).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <div className="flex space-x-3">
                          {appointment.status === "pending" && (
                            <button
                              onClick={() => cancelAppointment(appointment.id)}
                              className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          )}
                          {appointment.status === "confirmed" && (
                            <div className="flex space-x-2">
                              {appointment.consultation_type === "online" && (
                                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
                                  <i className="fas fa-video mr-1"></i>
                                  Join Call
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  cancelAppointment(appointment.id)
                                }
                                className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 text-sm font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                          {appointment.status === "completed" && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                              <i className="fas fa-star mr-1"></i>
                              Rate & Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    {appointment.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">
                          <strong>Lawyer's Note:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyAppointments;
