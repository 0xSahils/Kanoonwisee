import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLawyerAppointments,
  updateAppointmentStatus,
} from "../../store/slices/lawyerSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  FileText,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

const LawyerAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const { appointments, isLoading } = useSelector((state) => state.lawyer);

  useEffect(() => {
    dispatch(fetchLawyerAppointments());
  }, [dispatch]);

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      console.log("Updating appointment status:", { appointmentId, status });
      await dispatch(
        updateAppointmentStatus({ appointmentId, status })
      ).unwrap();
      console.log("Appointment status updated successfully");
      toast.success(`Appointment ${status} successfully`);
    } catch (error) {
      console.error("Failed to update appointment:", error);
      toast.error("Failed to update appointment");
    }
  };

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesSearch =
        appointment.client_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.ClientProfile?.User?.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      if (activeTab === "all") return matchesSearch;
      return matchesSearch && appointment.status === activeTab;
    })
    .sort((a, b) => {
      // Sort by scheduled_time in descending order (most recent first)
      const dateA = a.scheduled_time ? new Date(a.scheduled_time) : new Date(0);
      const dateB = b.scheduled_time ? new Date(b.scheduled_time) : new Date(0);
      return dateB - dateA;
    });

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return Clock;
      case "accepted":
        return CheckCircle;
      case "completed":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      default:
        return Clock;
    }
  };

  const appointmentCounts = {
    all: appointments.length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
    accepted: appointments.filter((apt) => apt.status === "accepted").length,
    completed: appointments.filter((apt) => apt.status === "completed").length,
    cancelled: appointments.filter((apt) => apt.status === "cancelled").length,
  };

  const capitalizeStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">
            Manage your client appointments and consultations
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            All ({appointmentCounts.all})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({appointmentCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Accepted ({appointmentCounts.accepted})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({appointmentCounts.completed})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Cancelled ({appointmentCounts.cancelled})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAppointments.length > 0 ? (
            <div className="grid gap-4">
              {filteredAppointments.map((appointment) => {
                const StatusIcon = getStatusIcon(appointment.status);
                // console.log(appointment)
                return (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <StatusIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {appointment.client_name}
                            </CardTitle>
                            <CardDescription>
                              {appointment.consultation_type} •{" "}
                              {appointment.scheduled_time
                                ? format(
                                    new Date(appointment.scheduled_time),
                                    "PPP p"
                                  )
                                : "Date TBD"}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(appointment.status)}>
                          {capitalizeStatus(appointment.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {appointment.client_name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {appointment.ClientProfile?.User?.email || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {appointment.ClientProfile?.phone || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {appointment.scheduled_time
                              ? format(
                                  new Date(appointment.scheduled_time),
                                  "MMM dd, yyyy"
                                )
                              : "Date TBD"}
                          </span>
                        </div>
                      </div>

                      {appointment.case_description && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">
                            Case Description:
                          </h4>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                            {appointment.case_description}
                          </p>
                        </div>
                      )}

                      {appointment.status === "pending" && (
                        <div className="flex space-x-2 pt-2 border-t">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(appointment.id, "accepted")
                            }
                            className="flex-1"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleStatusUpdate(appointment.id, "rejected")
                            }
                            className="flex-1"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      )}

                      {appointment.status === "accepted" && (
                        <div className="flex space-x-2 pt-2 border-t">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(appointment.id, "completed")
                            }
                            className="flex-1"
                          >
                            Mark as Completed
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleStatusUpdate(appointment.id, "cancelled")
                            }
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                No appointments found
              </h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? `No appointments match your search "${searchTerm}"`
                  : activeTab === "all"
                  ? "You have no appointments yet"
                  : `No ${activeTab} appointments`}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LawyerAppointments;
