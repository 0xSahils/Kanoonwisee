import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  fetchClientProfile,
  fetchClientAppointments,
} from "../../store/slices/clientSlice";
import Header from "../../components/landing/Header.jsx";
import Footer from "../../components/landing/Footer.jsx";
import {
  Calendar,
  Clock,
  Search,
  Star,
  TrendingUp,
  FileText,
  User,
} from "lucide-react";
import { format } from "date-fns";

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const { profile, appointments, isLoading } = useSelector(
    (state) => state.client
  );
  const { user } = useSelector((state) => state.auth);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchClientProfile());
    dispatch(fetchClientAppointments());
  }, [dispatch]);

  const upcomingAppointments = appointments.filter(
    (apt) =>
      apt.status === "accepted" &&
      apt.scheduled_time &&
      new Date(apt.scheduled_time) > new Date()
  );

  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "pending"
  );

  const quickStats = [
    {
      title: "Upcoming Consultations",
      value: upcomingAppointments.length,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Requests",
      value: pendingAppointments.length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Consultations",
      value: appointments.filter((apt) => apt.status === "completed").length,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Lawyers Consulted",
      value: new Set(appointments.map((apt) => apt.lawyer_id)).size,
      icon: User,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Header Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pb-16">
          <div className="absolute inset-0 opacity-10">
            <img
              src="/dashboard-bg-1.png"
              alt="Legal dashboard background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div>
                <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
                <h1 className="text-3xl lg:text-4xl font-light mb-4">
                  Welcome back,{" "}
                  <span className="text-yellow-500 font-semibold">
                    {profile?.full_name || user?.email?.split("@")[0]}
                  </span>
                  !
                </h1>
                <p className="text-xl text-gray-300">
                  Your legal consultation dashboard - Find the right counsel for
                  your needs
                </p>
              </div>
              <div className="flex space-x-3 mt-6 lg:mt-0">
                <Link to="/search-lawyers">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                    <Search className="h-4 w-4 mr-2 inline" />
                    Find Lawyers
                  </button>
                </Link>
                <Link to="/client/appointments">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                    <FileText className="h-4 w-4 mr-2 inline" />
                    My Appointments
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10 space-y-8">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-700">{stat.title}</h3>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span>Active</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-6 text-gray-900">
                <div className="flex items-center mb-2">
                  <Calendar className="h-6 w-6 mr-3" />
                  <h2 className="text-2xl font-bold">Upcoming Consultations</h2>
                </div>
                <p className="text-gray-800 opacity-90">
                  Your confirmed appointments with lawyers
                </p>
              </div>
              <div className="p-6">
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-gray-50 rounded-xl p-4 border-l-4 border-yellow-500 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {appointment.LawyerProfile?.full_name ||
                                  "Lawyer"}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <i className="fas fa-calendar mr-2 text-yellow-500"></i>
                                {appointment.scheduled_time
                                  ? format(
                                      new Date(appointment.scheduled_time),
                                      "MMM dd, HH:mm"
                                    )
                                  : "Date TBD"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {appointment.consultation_type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                appointment.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              <i
                                className={`fas fa-${
                                  appointment.status === "accepted"
                                    ? "check-circle"
                                    : "clock"
                                } mr-1`}
                              ></i>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {upcomingAppointments.length > 3 && (
                      <Link to="/client/appointments">
                        <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold py-3 rounded-xl transition-all">
                          View all {upcomingAppointments.length} appointments
                        </button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-32 h-32 mx-auto mb-4">
                      <img
                        src="/empty-appointment.png"
                        alt="No appointments"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No upcoming consultations
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Book your first consultation with a verified lawyer
                    </p>
                    <Link to="/search-lawyers">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all">
                        <Search className="h-4 w-4 mr-2 inline" />
                        Find Lawyers
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-400 p-6 text-gray-900">
                <div className="flex items-center mb-2">
                  <Clock className="h-6 w-6 mr-3" />
                  <h2 className="text-2xl font-bold">Pending Requests</h2>
                </div>
                <p className="text-gray-800 opacity-90">
                  Appointments awaiting lawyer confirmation
                </p>
              </div>
              <div className="p-6">
                {pendingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pendingAppointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500 hover:bg-orange-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                              <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {appointment.LawyerProfile?.full_name ||
                                  "Lawyer"}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center">
                                <i className="fas fa-calendar mr-2 text-orange-500"></i>
                                {appointment.scheduled_time
                                  ? format(
                                      new Date(appointment.scheduled_time),
                                      "MMM dd, HH:mm"
                                    )
                                  : "Date TBD"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                              <i className="fas fa-hourglass-half mr-1 animate-spin"></i>
                              Pending
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {pendingAppointments.length > 3 && (
                      <Link to="/client/appointments">
                        <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold py-3 rounded-xl transition-all">
                          View all {pendingAppointments.length} requests
                        </button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-32 h-32 mx-auto mb-4">
                      <img
                        src="/appointment-pending.png"
                        alt="No pending requests"
                        className="w-full h-full object-contain opacity-60"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No pending requests
                    </h3>
                    <p className="text-gray-600">
                      All your consultation requests have been processed
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
              <p className="text-gray-300">
                Common actions for your legal needs
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/search-lawyers" className="group">
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-transparent hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Find Lawyers
                    </h3>
                    <p className="text-sm text-gray-600">
                      Search and connect with verified legal experts
                    </p>
                  </div>
                </Link>
                <Link to="/client/appointments" className="group">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-transparent hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      My Appointments
                    </h3>
                    <p className="text-sm text-gray-600">
                      Manage your consultation schedule
                    </p>
                  </div>
                </Link>
                <Link to="/client/reviews" className="group">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-transparent hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">My Reviews</h3>
                    <p className="text-sm text-gray-600">
                      Rate and review your legal consultations
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDashboard;
