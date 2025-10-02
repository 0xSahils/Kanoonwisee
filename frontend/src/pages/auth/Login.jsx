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
import { Loader2, Shield, Mail, Lock, ArrowLeft } from "lucide-react";

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

  const { isLoading, error, otpSent } = useSelector((state) => state.auth);

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
      const result = await dispatch(
        verifyOtp({ email, otp: data.otp })
      ).unwrap();

      // Wait a bit longer for Redux state to fully update
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get fresh auth state from store
      const freshAuthState = store.getState().auth;

      console.log("OTP verification successful:", {
        result,
        freshAuthState: {
          isAuthenticated: freshAuthState.isAuthenticated,
          user: freshAuthState.user,
          role: freshAuthState.role,
        },
      });

      if (freshAuthState.isAuthenticated && freshAuthState.user) {
        toast.success("Login successful!");

        // Navigate based on user role with a small delay to ensure state consistency
        const targetRoute =
          freshAuthState.user.role === "lawyer"
            ? "/lawyer/dashboard"
            : freshAuthState.user.role === "admin"
            ? "/admin/dashboard"
            : "/client/dashboard";

        const from = location.state?.from?.pathname || targetRoute;

        console.log("Navigating to:", from);

        // Use setTimeout to ensure navigation happens after React re-render
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 100);
      } else {
        console.error(
          "Authentication state not properly updated after OTP verification",
          {
            isAuthenticated: freshAuthState.isAuthenticated,
            user: freshAuthState.user,
          }
        );
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-700/20 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative SVG Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-accent"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-accent/20 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-6">
          {/* Logo and Icon */}
          <div className="flex items-center justify-center mb-2">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-600 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>

              {/* Main icon container */}
              <div className="relative bg-gradient-to-br from-primary-900 to-primary-800 p-4 rounded-2xl shadow-lg">
                {step === "email" ? (
                  <Shield className="h-8 w-8 text-accent" strokeWidth={2} />
                ) : (
                  <Lock className="h-8 w-8 text-accent" strokeWidth={2} />
                )}
              </div>

              {/* Corner accent */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent-400 rounded-full"></div>
            </div>
          </div>

          {/* Brand Name */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-900 mb-1 tracking-tight">
              Kanoon<span className="text-accent">Wise</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-600 via-accent to-accent-600 mx-auto rounded-full"></div>
          </div>

          <CardTitle className="text-2xl text-center font-semibold text-primary-900">
            {step === "email" ? "Welcome Back" : "Verify Your Identity"}
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-600">
            {step === "email"
              ? "Sign in to access your legal dashboard"
              : `We've sent a verification code to ${email}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-6">
          {step === "email" ? (
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="role"
                  className="text-sm font-semibold text-gray-700"
                >
                  I am a
                </Label>
                <div className="relative">
                  <select
                    id="role"
                    className="flex h-11 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 ring-offset-background transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer"
                    {...emailForm.register("role")}
                  >
                    <option value="lawyer">Lawyer / Advocate</option>
                    <option value="client">Client</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {emailForm.formState.errors.role && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-xs">⚠</span>
                    {emailForm.formState.errors.role.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 h-11 border-2 border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg"
                    {...emailForm.register("email")}
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-xs">⚠</span>
                    {emailForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 hover:to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Send Verification Code
                  </>
                )}
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <Shield className="h-3.5 w-3.5" />
                <span>Secured with OTP authentication</span>
              </div>
            </form>
          ) : (
            <form
              onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="otp"
                  className="text-sm font-semibold text-gray-700"
                >
                  Verification Code
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    className="pl-10 h-11 border-2 border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg text-center text-lg font-semibold tracking-widest"
                    {...otpForm.register("otp")}
                  />
                </div>
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-xs">⚠</span>
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 hover:to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Verify & Sign In
                  </>
                )}
              </Button>

              <div className="flex items-center justify-between text-sm pt-2">
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="flex items-center gap-1 text-gray-600 hover:text-primary-900 font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-accent hover:text-accent-600 font-semibold disabled:opacity-50 transition-colors"
                >
                  Resend Code
                </button>
              </div>

              {/* Timer or info */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                <Mail className="h-3.5 w-3.5" />
                <span>Check your email inbox and spam folder</span>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Footer Text */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm z-10">
        <p>© 2024 KanoonWise. Secure Legal Platform</p>
      </div>
    </div>
  );
};

export default Login;
