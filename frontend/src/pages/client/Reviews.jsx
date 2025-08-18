import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClientReviews } from '../../store/slices/reviewSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { 
  Star, 
  User, 
  Calendar, 
  MessageSquare,
  Plus
} from 'lucide-react'
import { format } from 'date-fns'

const ClientReviews = () => {
  const dispatch = useDispatch()
  const { clientReviews, isLoading } = useSelector((state) => state.reviews)

  useEffect(() => {
    dispatch(fetchClientReviews())
  }, [dispatch])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
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
          <h1 className="text-3xl font-bold text-foreground">My Reviews</h1>
          <p className="text-muted-foreground">
            Reviews you've written for lawyers you've consulted
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Write Review
        </Button>
      </div>

      {/* Reviews List */}
      {clientReviews.length > 0 ? (
        <div className="grid gap-4">
          {clientReviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {review.lawyerName}
                      </CardTitle>
                      <CardDescription>
                        {review.lawyerSpecialization}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <Badge variant="secondary">{review.rating}/5</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Reviewed on {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {review.appointmentDate && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Consultation: {format(new Date(review.appointmentDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>

                  {review.comment && (
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
                        <p className="text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                      Appointment ID: {review.appointmentId}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit Review
                      </Button>
                      <Button variant="outline" size="sm">
                        Book Again
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
          <p className="text-muted-foreground mb-4">
            Write your first review after completing a consultation
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Write Your First Review
          </Button>
        </div>
      )}

      {/* Summary Stats */}
      {clientReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Summary</CardTitle>
            <CardDescription>
              Your reviewing activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {clientReviews.length}
                </div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {clientReviews.length > 0 
                    ? (clientReviews.reduce((acc, review) => acc + Number(review.rating || 0), 0) / clientReviews.length).toFixed(1)
                    : '0.0'}
                </div>
                <p className="text-sm text-muted-foreground">Average Rating Given</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {new Set(clientReviews.map(r => r.lawyerId)).size}
                </div>
                <p className="text-sm text-muted-foreground">Lawyers Reviewed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ClientReviews
