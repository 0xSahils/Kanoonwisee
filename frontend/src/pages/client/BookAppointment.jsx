import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { fetchLawyerDetails, bookAppointment } from '../../store/slices/clientSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  Loader2
} from 'lucide-react'

const bookingSchema = z.object({
  scheduled_time: z.string().min(1, 'Please select a date and time'),
  consultation_type: z.enum(['online', 'offline'], {
    required_error: 'Please select consultation type'
  }),
  case_description: z.string().optional(),
})

const BookAppointment = () => {
  const [searchParams] = useSearchParams()
  const lawyerId = searchParams.get('lawyer')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedLawyer, isLoading, error } = useSelector((state) => state.client)
  const [bookingLoading, setBookingLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      scheduled_time: '',
      consultation_type: 'online',
      case_description: '',
    }
  })

  useEffect(() => {
    if (lawyerId) {
      dispatch(fetchLawyerDetails(lawyerId))
    }
  }, [dispatch, lawyerId])

  const handleBack = () => {
    navigate('/client/search')
  }

  const handleSubmit = async (data) => {
    if (!lawyerId) return

    setBookingLoading(true)
    try {
      await dispatch(bookAppointment({
        lawyer_id: lawyerId,
        scheduled_time: new Date(data.scheduled_time).toISOString(),
        consultation_type: data.consultation_type,
        case_description: data.case_description,
      })).unwrap()

      // Success - redirect to appointments
      navigate('/client/appointments')
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setBookingLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !lawyerId) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">
          {error || 'Invalid booking request'}
        </p>
        <Button onClick={handleBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
      </div>
    )
  }

  if (!selectedLawyer) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Lawyer not found</p>
        <Button onClick={handleBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
      </div>
    )
  }

  const lawyer = selectedLawyer

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-muted-foreground">
            Schedule a consultation with {lawyer.full_name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Appointment Details
              </CardTitle>
              <CardDescription>
                Fill in the details for your consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="scheduled_time">Date & Time *</Label>
                  <Input
                    id="scheduled_time"
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    {...form.register('scheduled_time')}
                  />
                  {form.formState.errors.scheduled_time && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.scheduled_time.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultation_type">Consultation Type *</Label>
                  <select
                    id="consultation_type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...form.register('consultation_type')}
                  >
                    <option value="online">Online Consultation</option>
                    <option value="offline">In-person Meeting</option>
                  </select>
                  {form.formState.errors.consultation_type && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.consultation_type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="case_description">Case Description (Optional)</Label>
                  <Textarea
                    id="case_description"
                    placeholder="Describe your legal matter or any specific requirements..."
                    className="min-h-[100px]"
                    {...form.register('case_description')}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    disabled={bookingLoading}
                    className="flex-1"
                  >
                    {bookingLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Lawyer Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Lawyer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{lawyer.full_name}</h3>
                <p className="text-sm text-muted-foreground">{lawyer.User?.email}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{lawyer.city}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{lawyer.years_experience} years experience</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <h4 className="font-medium mb-2">Specializations:</h4>
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(lawyer.specialization) 
                    ? lawyer.specialization.map((spec, index) => (
                        <span key={index} className="text-xs bg-secondary px-2 py-1 rounded">
                          {spec}
                        </span>
                      ))
                    : <span className="text-xs bg-secondary px-2 py-1 rounded">
                        {lawyer.specialization}
                      </span>
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Fee Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Online Consultation</span>
                <span className="font-medium">₹{lawyer.fee_structure?.consultation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">In-person Meeting</span>
                <span className="font-medium">₹{lawyer.fee_structure?.court}</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Payment will be processed after appointment confirmation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Available Slots */}
          {lawyer.available_slots && lawyer.available_slots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Suggested Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lawyer.available_slots.slice(0, 3).map((slot, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => {
                      const date = new Date(slot)
                      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                      form.setValue('scheduled_time', localDate.toISOString().slice(0, 16))
                    }}
                  >
                    <Clock className="h-3 w-3 mr-2" />
                    {new Date(slot).toLocaleString()}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookAppointment
