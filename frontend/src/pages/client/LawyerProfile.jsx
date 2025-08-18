import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLawyerDetails } from '../../store/slices/clientSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { 
  ArrowLeft,
  MapPin, 
  Star, 
  DollarSign, 
  Languages, 
  Calendar,
  Clock,
  User,
  Briefcase,
  Award,
  MessageSquare
} from 'lucide-react'

const LawyerProfile = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedLawyer, isLoading, error } = useSelector((state) => state.client)

  useEffect(() => {
    if (id) {
      dispatch(fetchLawyerDetails(id))
    }
  }, [dispatch, id])

  const handleBookAppointment = () => {
    navigate(`/client/book?lawyer=${id}`)
  }

  const handleBack = () => {
    navigate('/client/search')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error: {error}</p>
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
          <h1 className="text-3xl font-bold text-foreground">Lawyer Profile</h1>
          <p className="text-muted-foreground">
            Detailed information about {lawyer.full_name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{lawyer.full_name}</CardTitle>
                    <CardDescription className="text-base">
                      {lawyer.User?.email}
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{lawyer.bar_registration_number}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">
                      {lawyer.average_rating && Number(lawyer.average_rating) > 0 
                        ? Number(lawyer.average_rating).toFixed(1) 
                        : 'No ratings'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {lawyer.review_count || 0} reviews
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {lawyer.years_experience} years experience
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{lawyer.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {Array.isArray(lawyer.languages) 
                      ? lawyer.languages.join(', ') 
                      : lawyer.languages}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm capitalize">{lawyer.consultation_type}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card>
            <CardHeader>
              <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(lawyer.specialization) 
                  ? lawyer.specialization.map((spec, index) => (
                      <Badge key={index} variant="secondary">{spec}</Badge>
                    ))
                  : <Badge variant="secondary">{lawyer.specialization}</Badge>
                }
              </div>
            </CardContent>
          </Card>

          {/* Court Practice */}
          <Card>
            <CardHeader>
              <CardTitle>Court Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(lawyer.court_practice) 
                  ? lawyer.court_practice.map((court, index) => (
                      <Badge key={index} variant="outline">{court}</Badge>
                    ))
                  : <Badge variant="outline">{lawyer.court_practice}</Badge>
                }
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          {lawyer.Reviews && lawyer.Reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Recent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lawyer.Reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        {review.ClientProfile?.full_name || 'Anonymous'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Fee Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Consultation</span>
                <span className="font-medium">₹{lawyer.fee_structure?.consultation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Court Representation</span>
                <span className="font-medium">₹{lawyer.fee_structure?.court}</span>
              </div>
            </CardContent>
          </Card>

          {/* Available Slots */}
          {lawyer.available_slots && lawyer.available_slots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Next Available Slots
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lawyer.available_slots.slice(0, 3).map((slot, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(slot).toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Book Appointment Button */}
          <Card>
            <CardContent className="p-6">
              <Button 
                onClick={handleBookAppointment}
                className="w-full"
                size="lg"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LawyerProfile
