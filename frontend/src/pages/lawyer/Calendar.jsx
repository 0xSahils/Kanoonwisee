import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { fetchLawyerAppointments } from '../../store/slices/lawyerSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const LawyerCalendar = () => {
  const [view, setView] = useState('month')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const dispatch = useDispatch()
  const { appointments, isLoading } = useSelector((state) => state.lawyer)

  useEffect(() => {
    dispatch(fetchLawyerAppointments())
  }, [dispatch])

  // Convert appointments to calendar events
  const events = appointments
    .filter(appointment => appointment.scheduled_time && !isNaN(new Date(appointment.scheduled_time)))
    .map(appointment => ({
      id: appointment.id,
      title: `${appointment.client_name} - ${appointment.consultation_type}`,
      start: new Date(appointment.scheduled_time),
      end: new Date(new Date(appointment.scheduled_time).getTime() + 60 * 60 * 1000), // 1 hour duration
      resource: appointment,
    }))

  const eventStyleGetter = (event) => {
    const appointment = event.resource
    let backgroundColor = '#3174ad'
    
    switch (appointment.status) {
      case 'pending':
        backgroundColor = '#f59e0b'
        break
      case 'accepted':
        backgroundColor = '#10b981'
        break
      case 'completed':
        backgroundColor = '#6b7280'
        break
      case 'cancelled':
        backgroundColor = '#ef4444'
        break
      default:
        backgroundColor = '#3174ad'
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'accepted': return 'success'
      case 'completed': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'secondary'
    }
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
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your appointments and availability
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            Week
          </Button>
          <Button
            variant={view === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('day')}
          >
            Day
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Appointment Calendar
            </CardTitle>
            <CardDescription>
              Click on an appointment to view details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: '600px' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                view={view}
                onView={setView}
                views={['month', 'week', 'day']}
                step={60}
                showMultiDayTimes
                className="bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details / Legend */}
        <div className="space-y-4">
          {/* Status Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Status Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Accepted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Cancelled</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Appointment Details */}
          {selectedEvent && (
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium">{selectedEvent.client_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.ClientProfile?.User?.email || 'No email available'}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {selectedEvent.scheduled_time ? 
                      format(new Date(selectedEvent.scheduled_time), 'PPP p') : 
                      'No time scheduled'
                    }
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedEvent.consultation_type}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(selectedEvent.status)}>
                    {selectedEvent.status}
                  </Badge>
                </div>

                {selectedEvent.description && (
                  <div>
                    <h5 className="font-medium text-sm mb-1">Description:</h5>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}

                {selectedEvent.status === 'pending' && (
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      Accept
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      Decline
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="text-sm font-medium">{appointments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending:</span>
                <span className="text-sm font-medium">
                  {appointments.filter(apt => apt.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Accepted:</span>
                <span className="text-sm font-medium">
                  {appointments.filter(apt => apt.status === 'accepted').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Completed:</span>
                <span className="text-sm font-medium">
                  {appointments.filter(apt => apt.status === 'completed').length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LawyerCalendar
