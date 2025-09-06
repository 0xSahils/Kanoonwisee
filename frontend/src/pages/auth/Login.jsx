import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  requestOtp,
  verifyOtp,
  clearError,
} from "../../store/slices/authSlice";
import { store } from "../../store"; // Import store directly for fresh state
import { Loader2, Shield } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["lawyer", "client", "admin"], {
    required_error: "Please select your role",
  }),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

const Login = () => {
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, otpSent } = useSelector(
    (state) => state.auth
  );

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", role: "lawyer" },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (otpSent) {
      setStep("otp");
      toast.success("OTP sent to your email");
    }
  }, [otpSent]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleEmailSubmit = async (data) => {
    try {
      await dispatch(
        requestOtp({ email: data.email, role: data.role })
      ).unwrap();
      setEmail(data.email);
      setSelectedRole(data.role);
    } catch {
      // Error handled by useEffect
    }
  };

  const handleOtpSubmit = async (data) => {
    try {
      // Verify OTP and get user data
      const result = await dispatch(verifyOtp({ email, otp: data.otp })).unwrap();
      
      // Wait a bit longer for Redux state to fully update
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get fresh auth state from store
      const freshAuthState = store.getState().auth;
      
      console.log('OTP verification successful:', {
        result,
        freshAuthState: {
          isAuthenticated: freshAuthState.isAuthenticated,
          user: freshAuthState.user,
          role: freshAuthState.role
        }
      });
      
      if (freshAuthState.isAuthenticated && freshAuthState.user) {
        toast.success("Login successful!");
        
        // Navigate based on user role with a small delay to ensure state consistency
        const targetRoute = freshAuthState.user.role === "lawyer" 
          ? "/lawyer/dashboard" 
          : freshAuthState.user.role === "admin"
          ? "/admin/dashboard" 
          : "/client/dashboard";
        
        const from = location.state?.from?.pathname || targetRoute;
        
        console.log('Navigating to:', from);
        
        // Use setTimeout to ensure navigation happens after React re-render
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 100);
      } else {
        console.error("Authentication state not properly updated after OTP verification", {
          isAuthenticated: freshAuthState.isAuthenticated,
          user: freshAuthState.user
        });
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      // Error handled by useEffect
    }
  };

  const handleResendOtp = async () => {
    try {
      await dispatch(requestOtp({ email, role: selectedRole })).unwrap();
      toast.success("OTP resent!");
    } catch {
      // Error handled by useEffect
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setEmail("");
    setSelectedRole("");
    emailForm.reset();
    otpForm.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {step === "email" ? "Welcome to KanoonWise" : "Enter OTP"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === "email"
              ? "Enter your email to receive an OTP"
              : `Enter the 6-digit code sent to ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" ? (
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <select
                  id="role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...emailForm.register("role")}
                >
                  <option value="lawyer">Lawyer</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
                {emailForm.formState.errors.role && (
                  <p className="text-sm text-destructive">
                    {emailForm.formState.errors.role.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {emailForm.formState.errors.email.message}
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
                  "Send OTP"
                )}
              </Button>
            </form>
          ) : (
            <form
              onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="otp">6-Digit OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  {...otpForm.register("otp")}
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
                  "Verify OTP"
                )}
              </Button>

              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to email
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-primary hover:underline disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
