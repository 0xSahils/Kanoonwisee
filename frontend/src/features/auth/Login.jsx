import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { requestOtp, verifyOtp, clearError, setCredentials } from '../../store/slices/authSlice'
import { Loader2, Mail, Shield } from 'lucide-react'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['lawyer', 'client'], { required_error: 'Please select your role' })
})

const otpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
})

const Login = () => {
  const [step, setStep] = useState('email') // 'email' or 'otp'
  const [email, setEmail] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  const { isLoading, error, otpSent, isAuthenticated, role } = useSelector((state) => state.auth)

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '', role: 'lawyer' }
  })

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' }
  })

  useEffect(() => {
    if (isAuthenticated && role) {
      const from = location.state?.from?.pathname || 
                   (role === 'lawyer' ? '/lawyer/dashboard' : '/client/dashboard')
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, role, navigate, location])

  useEffect(() => {
    if (otpSent) {
      setStep('otp')
      toast.success('OTP sent to your email')
    }
  }, [otpSent])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleEmailSubmit = async (data) => {
    try {
      await dispatch(requestOtp({ email: data.email, role: data.role })).unwrap()
      setEmail(data.email)
      setSelectedRole(data.role)
    } catch {
      // Error handled by useEffect
    }
  }

  const handleOtpSubmit = async (data) => {
    try {
      const result = await dispatch(verifyOtp({ email, otp: data.otp })).unwrap()
      
      // Use setCredentials to ensure proper state management
      dispatch(setCredentials({
        token: result.token,
        role: result.user.role,
        user: result.user,
        refreshToken: result.refreshToken
      }))
      
      toast.success('Login successful!')
    } catch {
      // Error handled by useEffect
    }
  }

  const handleResendOtp = async () => {
    try {
      await dispatch(requestOtp({ email, role: selectedRole })).unwrap()
      toast.success('OTP resent!')
    } catch {
      // Error handled by useEffect
    }
  }

  const handleBackToEmail = () => {
    setStep('email')
    setEmail('')
    setSelectedRole('')
    emailForm.reset()
    otpForm.reset()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to KanoonWise</CardTitle>
          <CardDescription>
            {step === 'email' 
              ? 'Enter your email to get started' 
              : 'Enter the OTP sent to your email'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    {...emailForm.register('email')}
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>I am a</Label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="lawyer"
                      {...emailForm.register('role')}
                      className="radio"
                    />
                    <span>Lawyer</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="client"
                      {...emailForm.register('role')}
                      className="radio"
                    />
                    <span>Client</span>
                  </label>
                </div>
                {emailForm.formState.errors.role && (
                  <p className="text-sm text-destructive">
                    {emailForm.formState.errors.role.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  We've sent a 6-digit code to <strong>{email}</strong>
                </p>
              </div>

              <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    {...otpForm.register('otp')}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      e.target.value = value
                      otpForm.setValue('otp', value)
                    }}
                  />
                  {otpForm.formState.errors.otp && (
                    <p className="text-sm text-destructive">
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleResendOtp}
                    disabled={isLoading}
                  >
                    Resend OTP
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToEmail}
                    disabled={isLoading}
                  >
                    Change Email
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
