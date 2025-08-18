import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { searchLawyers, fetchAllLawyers, clearSearchResults } from '../../store/slices/clientSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { 
  Search, 
  MapPin, 
  Star, 
  DollarSign, 
  Languages, 
  Filter,
  Loader2,
  User
} from 'lucide-react'

const searchSchema = z.object({
  specialization: z.string().optional(),
  location: z.string().optional(),
  minFees: z.number().optional(),
  maxFees: z.number().optional(),
  language: z.string().optional(),
  minRating: z.number().optional(),
})

const ClientSearch = () => {
  const [showFilters, setShowFilters] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { searchResults, searchLoading, hasSearched, error } = useSelector((state) => state.client)

  // Debug: Log search results
  console.log('Search Results:', searchResults)

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      specialization: '',
      location: '',
      minFees: undefined,
      maxFees: undefined,
      language: '',
      minRating: undefined,
    }
  })

  useEffect(() => {
    // Load all lawyers by default when component mounts
    dispatch(fetchAllLawyers())
    
    return () => {
      dispatch(clearSearchResults())
    }
  }, [dispatch])

  const handleSearch = async (data) => {
    const searchParams = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        // Map frontend field names to backend field names
        const fieldMap = {
          location: 'city',
          minFees: 'min_fee',
          maxFees: 'max_fee',
          minRating: 'min_rating'
        }
        const backendKey = fieldMap[key] || key
        acc[backendKey] = value
      }
      return acc
    }, {})

    try {
      // console.log('Sending search params:', searchParams)
      const result = await dispatch(searchLawyers(searchParams)).unwrap()
      console.log('Search result:', result)
    } catch (error) {
      console.error('Search error:', error)
      // Error handled by Redux
    }
  }

  const handleViewProfile = (lawyerId) => {
    navigate(`/lawyer-profile/${lawyerId}`)
  }

  const specializations = [
    'Family Law',
    'Corporate Law',
    'Criminal Law',
    'Civil Law',
    'Property Law',
    'Tax Law',
    'Immigration Law',
    'Employment Law',
    'Intellectual Property',
    'Environmental Law'
  ]

  const languages = [
    'English',
    'Hindi',
    'Marathi',
    'Tamil',
    'Telugu',
    'Bengali',
    'Gujarati',
    'Kannada',
    'Malayalam',
    'Punjabi'
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Find Lawyers</h1>
          <p className="text-muted-foreground">
            Search for qualified lawyers based on your legal needs
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search Lawyers
          </CardTitle>
          <CardDescription>
            Use filters to find lawyers that match your requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialization">Legal Area</Label>
                <select
                  id="specialization"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...form.register('specialization')}
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  {...form.register('location')}
                />
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="minFees">Min Fees (₹)</Label>
                  <Input
                    id="minFees"
                    type="number"
                    min="0"
                    placeholder="500"
                    {...form.register('minFees', { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxFees">Max Fees (₹)</Label>
                  <Input
                    id="maxFees"
                    type="number"
                    min="0"
                    placeholder="5000"
                    {...form.register('maxFees', { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...form.register('language')}
                  >
                    <option value="">Any Language</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minRating">Minimum Rating</Label>
                  <select
                    id="minRating"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...form.register('minRating', { valueAsNumber: true })}
                  >
                    <option value="">Any Rating</option>
                    <option value={4}>4+ Stars</option>
                    <option value={3}>3+ Stars</option>
                    <option value={2}>2+ Stars</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                type="submit" 
                disabled={searchLoading}
                className="flex-1 md:flex-initial"
              >
                {searchLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Lawyers
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  dispatch(clearSearchResults())
                  dispatch(fetchAllLawyers()) // Reload all lawyers
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Loading state */}
      {searchLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {hasSearched ? 'Searching...' : 'Loading lawyers...'}
          </p>
        </div>
      )}

      {/* Search Results */}
      {searchResults && searchResults.length > 0 && !searchLoading && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {hasSearched ? `Search Results (${searchResults.length} lawyers found)` : `All Lawyers`}
            </h2>
          </div>

          <div className="grid gap-4">
            {searchResults.map((lawyer) => (
              <Card key={lawyer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{lawyer.full_name}</h3>
                          <p className="text-sm text-muted-foreground">{lawyer.User?.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 flex-wrap gap-1">
                          {Array.isArray(lawyer.specialization) 
                            ? lawyer.specialization.map((spec, index) => (
                                <Badge key={index} variant="secondary">{spec}</Badge>
                              ))
                            : <Badge variant="secondary">{lawyer.specialization}</Badge>
                          }
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{lawyer.city}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">₹{lawyer.fee_structure?.consultation}/consultation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm">
                            {lawyer.average_rating && Number(lawyer.average_rating) > 0 
                              ? `${Number(lawyer.average_rating).toFixed(1)} (${lawyer.review_count} reviews)` 
                              : 'No ratings'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <Languages className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {Array.isArray(lawyer.languages) 
                              ? lawyer.languages.join(', ') 
                              : lawyer.languages}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {lawyer.years_experience} years experience
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Practices in {Array.isArray(lawyer.court_practice) 
                          ? lawyer.court_practice.join(', ') 
                          : lawyer.court_practice}. 
                        Consultation Type: {lawyer.consultation_type === 'both' 
                          ? 'Online & In-person' 
                          : lawyer.consultation_type}
                      </p>
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      <Button 
                        onClick={() => handleViewProfile(lawyer.id)}
                        size="sm"
                      >
                        View Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/client/book?lawyer=${lawyer.id}`)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {(!searchResults || searchResults.length === 0) && !searchLoading && hasSearched && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">No lawyers found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or removing some filters
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive">Error: {error}</p>
        </div>
      )}
    </div>
  )
}

export default ClientSearch
