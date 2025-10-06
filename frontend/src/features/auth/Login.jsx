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
import { Loader2, Mail, Shield } from "lucide-react";

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

  const { isLoading, error, otpSent, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", role: "lawyer" },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (isAuthenticated && role) {
      const from =
        location.state?.from?.pathname ||
        (role === "lawyer"
          ? "/lawyer/dashboard"
          : role === "admin"
          ? "/admin/panel"
          : "/client/dashboard");
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, role, navigate, location]);

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
      await dispatch(verifyOtp({ email, otp: data.otp })).unwrap();

      // No need to use setCredentials - verifyOtp already sets the state correctly
      toast.success("Login successful!");
    } catch {
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background Pattern - CSS-based instead of missing image */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334e68' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-primary-300/20 rounded-full blur-lg"></div>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
          {/* Left Side - Graphics and Info */}
          <div className="hidden lg:block space-y-8">
            <div className="text-center">
              {/* Replace missing image with CSS-based legal illustration */}
              <div className="w-full max-w-md mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-white relative overflow-hidden">
                {/* Legal scales icon as main graphic */}
                <div className="relative z-10">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-balance-scale text-6xl text-accent-400"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Legal Excellence</h3>
                  <p className="text-primary-100">
                    Professional Legal Services Platform
                  </p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-accent-400/20 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
              </div>
            </div>
            <div className="text-center text-gray-900 space-y-4">
              <h2 className="text-3xl font-bold">
                Join India's Trusted Legal Platform
              </h2>
              <p className="text-gray-600 text-lg">
                Connect with verified legal experts and grow your practice with
                KanoonWise
              </p>
                {/* <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-700">
                      500+
                    </div>
                    <div className="text-sm text-gray-500">Verified Lawyers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-700">
                      1000+
                    </div>
                    <div className="text-sm text-gray-500">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-700">
                      24/7
                    </div>
                    <div className="text-sm text-gray-500">Support</div>
                  </div>
                </div> */}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-white border border-gray-200 shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-800">
                  Welcome to KanoonWise
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {step === "email"
                    ? "Enter your email to get started"
                    : "Enter the OTP sent to your email"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === "email" ? (
                  <form
                    onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                          {...emailForm.register("email")}
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
                            {...emailForm.register("role")}
                            className="radio"
                          />
                          <span>Lawyer</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="client"
                            {...emailForm.register("role")}
                            className="radio"
                          />
                          <span>Client</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="admin"
                            {...emailForm.register("role")}
                            className="radio"
                          />
                          <span>Admin</span>
                        </label>
                      </div>
                      {emailForm.formState.errors.role && (
                        <p className="text-sm text-destructive">
                          {emailForm.formState.errors.role.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
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
                  <div className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We've sent a 6-digit code to <strong>{email}</strong>
                      </p>
                    </div>

                    <form
                      onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="otp">OTP Code</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="000000"
                          maxLength={6}
                          className="text-center text-2xl tracking-widest"
                          {...otpForm.register("otp")}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            e.target.value = value;
                            otpForm.setValue("otp", value);
                          }}
                        />
                        {otpForm.formState.errors.otp && (
                          <p className="text-sm text-destructive">
                            {otpForm.formState.errors.otp.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify OTP"
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
        </div>
      </div>
    </div>
  );
};

export default Login;
