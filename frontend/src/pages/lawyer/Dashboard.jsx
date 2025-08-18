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
  fetchLawyerProfile,
  fetchLawyerAppointments,
} from "../../store/slices/lawyerSlice";
import Header from "../../components/landing/Header.jsx";
import Footer from "../../components/landing/Footer.jsx";
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  FileText,
  User,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";

const LawyerDashboard = () => {
  const dispatch = useDispatch();
  const { profile, appointments, isLoading } = useSelector(
    (state) => state.lawyer
  );
  const { user } = useSelector((state) => state.auth);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchLawyerProfile());
    dispatch(fetchLawyerAppointments());
  }, [dispatch]);

  const todayAppointments = appointments.filter(
    (apt) =>
      apt.scheduled_time &&
      format(new Date(apt.scheduled_time), "yyyy-MM-dd") ===
        format(new Date(), "yyyy-MM-dd")
  );

  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "pending"
  );
  const upcomingAppointments = appointments.filter(
    (apt) =>
      apt.status === "accepted" &&
      apt.scheduled_time &&
      new Date(apt.scheduled_time) > new Date()
  );

  const quickStats = [
    {
      title: "Today's Consultations",
      value: todayAppointments.length,
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
      title: "Upcoming Consultations",
      value: upcomingAppointments.length,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Consultations",
      value: appointments.filter((apt) => apt.status === "completed").length,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "accepted":
        return "success";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

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
              src="/dashboard-bg-2.png"
              alt="Legal practice background"
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
                  Your legal practice dashboard - Manage appointments and grow
                  your practice
                </p>
              </div>
              <div className="flex space-x-3 mt-6 lg:mt-0">
                <Link to="/lawyer/profile">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                    <User className="h-4 w-4 mr-2 inline" />
                    View Profile
                  </button>
                </Link>
                <Link to="/lawyer/calendar">
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                    <CalendarDays className="h-4 w-4 mr-2 inline" />
                    Open Calendar
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Appointments
                </CardTitle>
                <CardDescription>
                  Your scheduled consultations for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                {todayAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {todayAppointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {appointment.client_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.scheduled_time
                              ? format(
                                  new Date(appointment.scheduled_time),
                                  "HH:mm"
                                )
                              : "Time TBD"}{" "}
                            - {appointment.consultation_type}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                    {todayAppointments.length > 3 && (
                      <Link to="/lawyer/appointments">
                        <Button variant="ghost" size="sm" className="w-full">
                          View all {todayAppointments.length} appointments
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No appointments scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pending Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Pending Requests
                </CardTitle>
                <CardDescription>
                  New appointment requests awaiting your response
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {pendingAppointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {appointment.client_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.scheduled_time
                              ? format(
                                  new Date(appointment.scheduled_time),
                                  "MMM dd, HH:mm"
                                )
                              : "Date TBD"}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Accept
                          </Button>
                          <Button size="sm" variant="destructive">
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                    {pendingAppointments.length > 3 && (
                      <Link to="/lawyer/appointments">
                        <Button variant="ghost" size="sm" className="w-full">
                          View all {pendingAppointments.length} requests
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No pending requests</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used actions for your practice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/lawyer/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </Link>
                <Link to="/lawyer/calendar">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Calendar
                  </Button>
                </Link>
                <Link to="/lawyer/appointments">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    View All Appointments
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LawyerDashboard;
