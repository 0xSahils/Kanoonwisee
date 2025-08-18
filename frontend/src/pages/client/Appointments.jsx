import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClientAppointments } from '../../store/slices/clientSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { 
  FileText, 
  Calendar, 
  User, 
  Mail, 
  MapPin,
  Clock,
  XCircle
} from 'lucide-react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const ClientAppointments = () => {
  const [activeTab, setActiveTab] = useState('all')
  const dispatch = useDispatch()
  const { appointments, isLoading } = useSelector((state) => state.client)

  useEffect(() => {
    dispatch(fetchClientAppointments())
  }, [dispatch])

  const handleCancelAppointment = async (appointmentId) => {
    try {
      // TODO: Implement appointment cancellation
      console.log('Cancelling appointment:', appointmentId)
      // await dispatch(cancelAppointment(appointmentId))
      toast.success('Appointment cancelled successfully')
    } catch {
      toast.error('Failed to cancel appointment')
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'all') return true
    return appointment.status === activeTab
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'accepted': return 'success'
      case 'completed': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'secondary'
    }
  }

  const appointmentCounts = {
    all: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    accepted: appointments.filter(apt => apt.status === 'accepted').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  }

  const capitalizeStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your legal consultations
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All ({appointmentCounts.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({appointmentCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Confirmed ({appointmentCounts.accepted})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({appointmentCounts.completed})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({appointmentCounts.cancelled})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAppointments.length > 0 ? (
            <div className="grid gap-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {appointment.LawyerProfile?.full_name || 'Lawyer'}
                          </CardTitle>
                          <CardDescription>
                            {appointment.consultation_type} • {appointment.scheduled_time ? format(new Date(appointment.scheduled_time), 'PPP p') : 'Date TBD'}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(appointment.status)}>
                        {capitalizeStatus(appointment.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.LawyerProfile?.full_name || 'Lawyer'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.LawyerProfile?.User?.email || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.LawyerProfile?.city || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {appointment.scheduled_time ? format(new Date(appointment.scheduled_time), 'MMM dd, yyyy') : 'Date TBD'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {appointment.scheduled_time ? format(new Date(appointment.scheduled_time), 'HH:mm') : 'Time TBD'}
                        </span>
                      </div>
                    </div>

                    {appointment.LawyerProfile?.specialization && (
                      <div className="flex items-center space-x-2 mb-2 flex-wrap gap-1">
                        {Array.isArray(appointment.LawyerProfile.specialization) 
                          ? appointment.LawyerProfile.specialization.map((spec, index) => (
                              <Badge key={index} variant="secondary">{spec}</Badge>
                            ))
                          : <Badge variant="secondary">{appointment.LawyerProfile.specialization}</Badge>
                        }
                        {appointment.LawyerProfile?.years_experience && (
                          <span className="text-sm text-muted-foreground ml-2">
                            {appointment.LawyerProfile.years_experience} years experience
                          </span>
                        )}
                      </div>
                    )}

                    {appointment.case_description && (
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Case Description:</h4>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                          {appointment.case_description}
                        </p>
                      </div>
                    )}

                    {appointment.fee && (
                      <div className="mb-4">
                        <p className="text-sm">
                          <span className="font-medium">Consultation Fee:</span> ₹{appointment.fee}
                        </p>
                      </div>
                    )}

                    {appointment.status === 'pending' && (
                      <div className="flex space-x-2 pt-2 border-t">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="flex items-center"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Request
                        </Button>
                      </div>
                    )}

                    {appointment.status === 'completed' && (
                      <div className="flex space-x-2 pt-2 border-t">
                        <Button size="sm" variant="outline">
                          Write Review
                        </Button>
                        <Button size="sm" variant="outline">
                          Book Again
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">No appointments found</h3>
              <p className="text-muted-foreground">
                {activeTab === 'all' 
                  ? 'You have no appointments yet'
                  : `No ${activeTab} appointments`
                }
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ClientAppointments
