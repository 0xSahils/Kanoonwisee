import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { fetchClientProfile, updateClientProfile } from '../../store/slices/clientSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar,
  Briefcase,
  Save,
  Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  pincode: z.string().min(6, 'Pincode must be 6 digits'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  occupation: z.string().min(2, 'Occupation is required'),
  emergency_contact: z.string().min(10, 'Emergency contact must be at least 10 digits'),
  preferred_communication: z.enum(['email', 'phone', 'both']),
  preferred_consultation_type: z.enum(['online', 'offline', 'both']),
  legal_history: z.string().optional(),
})

const ClientProfile = () => {
  const dispatch = useDispatch()
  const { profile, isLoading } = useSelector((state) => state.client)
  const { user } = useSelector((state) => state.auth)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      date_of_birth: '',
      occupation: '',
      emergency_contact: '',
      preferred_communication: 'email',
      preferred_consultation_type: 'both',
      legal_history: '',
    }
  })

  useEffect(() => {
    dispatch(fetchClientProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      // Pre-fill form with existing profile data
      Object.keys(profile).forEach(key => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, profile[key] || '')
        }
      })
      
      // Handle date formatting
      if (profile.date_of_birth) {
        const date = new Date(profile.date_of_birth)
        form.setValue('date_of_birth', date.toISOString().split('T')[0])
      }
    }
  }, [profile, form])

  const onSubmit = async (data) => {
    setIsSaving(true)
    try {
      await dispatch(updateClientProfile(data)).unwrap()
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Update Your Profile
          </h1>
          <p className="text-muted-foreground">
            Keep your profile information up to date
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Basic information about yourself
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  placeholder="Enter your full name"
                  {...form.register('full_name')}
                />
                {form.formState.errors.full_name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  {...form.register('phone')}
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth *</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  {...form.register('date_of_birth')}
                />
                {form.formState.errors.date_of_birth && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.date_of_birth.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation *</Label>
                <Input
                  id="occupation"
                  placeholder="e.g., Software Engineer, Doctor, Business Owner"
                  {...form.register('occupation')}
                />
                {form.formState.errors.occupation && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.occupation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact">Emergency Contact *</Label>
                <Input
                  id="emergency_contact"
                  placeholder="Emergency contact number"
                  {...form.register('emergency_contact')}
                />
                {form.formState.errors.emergency_contact && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.emergency_contact.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address Information
            </CardTitle>
            <CardDescription>
              Your residential address details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter your complete address"
                className="min-h-[80px]"
                {...form.register('address')}
              />
              {form.formState.errors.address && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  {...form.register('city')}
                />
                {form.formState.errors.city && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="Enter your state"
                  {...form.register('state')}
                />
                {form.formState.errors.state && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.state.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  placeholder="Enter pincode"
                  {...form.register('pincode')}
                />
                {form.formState.errors.pincode && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Communication Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Communication Preferences
            </CardTitle>
            <CardDescription>
              How would you like lawyers to contact you initially?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferred_communication">Preferred Communication Method *</Label>
              <select
                id="preferred_communication"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...form.register('preferred_communication')}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="both">Both Email and Phone</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Preferred Consultation Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Preferred Consultation Type
            </CardTitle>
            <CardDescription>
              How would you prefer to have consultations with lawyers?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferred_consultation_type">Consultation Type *</Label>
              <select
                id="preferred_consultation_type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...form.register('preferred_consultation_type')}
              >
                <option value="online">Online (Video/Audio Call)</option>
                <option value="offline">In-Person Meeting</option>
                <option value="both">Both Online and In-Person</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Legal History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Legal History (Optional)
            </CardTitle>
            <CardDescription>
              Any previous legal matters or ongoing cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="legal_history">Legal History</Label>
              <Textarea
                id="legal_history"
                placeholder="Describe any previous legal matters, ongoing cases, or relevant legal history..."
                className="min-h-[100px]"
                {...form.register('legal_history')}
              />
              <p className="text-xs text-muted-foreground">
                This information helps lawyers understand your legal background and provide better assistance
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="submit"
            disabled={isSaving}
            size="lg"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ClientProfile
