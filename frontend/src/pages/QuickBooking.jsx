import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import Header from "../components/landing/Header.jsx";
import Footer from "../components/landing/Footer.jsx";

const QuickBooking = () => {
  const { lawyerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(user ? "booking" : "details");
  const [submitting, setSubmitting] = useState(false);

  // User details form
  const [userDetails, setUserDetails] = useState({
    email: "",
    phone: "",
    full_name: "",
    otp: "",
  });

  // Booking form
  const [bookingData, setBookingData] = useState({
    consultation_type: "online",
    case_description: "",
    preferred_date: "",
    preferred_time: "",
  });

  const [otpSent, setOtpSent] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/public/lawyers/${lawyerId}`
        );
        if (response.ok) {
          const data = await response.json();
          setLawyer(data);
        }
      } catch (error) {
        console.error("Error fetching lawyer:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lawyerId) {
      fetchLawyer();
    }

    // Check token on component mount
    const token = localStorage.getItem("token");
    console.log(
      "Component mounted - Token in localStorage:",
      token ? "EXISTS" : "NOT FOUND"
    );
    console.log("User from Redux on mount:", user);
  }, [lawyerId]);

  // Add authentication state sync effect
  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem("token");
      if (token && !user) {
        console.log(
          "Token exists but no user in Redux - this might be a sync issue"
        );
      } else if (!token && user) {
        console.log(
          "User in Redux but no token - this might be a persistence issue"
        );
      }
    };

    syncAuthState();

    // Periodic sync every 2 seconds during the component lifecycle
    const interval = setInterval(syncAuthState, 2000);

    return () => clearInterval(interval);
  }, [user]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/request-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userDetails.email,
            role: "client",
          }),
        }
      );

      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent to your email!");
      } else {
        // Handle both JSON and non-JSON error responses
        let errorMessage = "Failed to send OTP";
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch {
          // If JSON parsing fails, try to get the text response
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage = `Error ${response.status}: ${response.statusText}`;
          }
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userDetails.email,
            otp: userDetails.otp,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("OTP verification response:", data);

        if (!data.token || !data.user) {
          throw new Error("Invalid response: missing token or user data");
        }

        // Set authentication timestamp for grace period
        localStorage.setItem("authTimestamp", Date.now().toString());

        // Update Redux state (this will also store in localStorage automatically)
        dispatch(
          setCredentials({
            token: data.token,
            user: data.user,
            role: data.user.role,
            refreshToken: data.refreshToken, // Include refresh token
          })
        );

        // Wait a moment for Redux to complete the localStorage operations
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Verify storage after Redux update
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        console.log("After Redux dispatch verification:");
        console.log(
          "- Token in localStorage:",
          storedToken ? "EXISTS" : "MISSING"
        );
        console.log(
          "- User in localStorage:",
          storedUser ? "EXISTS" : "MISSING"
        );
        console.log(
          "- RefreshToken in localStorage:",
          storedRefreshToken ? "EXISTS" : "MISSING"
        );
        console.log("- Redux state updated with:", {
          token: data.token ? "EXISTS" : "MISSING",
          user: data.user ? "EXISTS" : "MISSING",
          refreshToken: data.refreshToken ? "EXISTS" : "MISSING",
          role: data.user.role,
        });

        // Create/update client profile
        await updateClientProfile();

        // Small delay to ensure everything is properly set
        setTimeout(() => {
          const finalToken = localStorage.getItem("token");
          const finalUser = localStorage.getItem("user");
          console.log("PRE-BOOKING FINAL CHECK:");
          console.log(
            "- Token in localStorage:",
            finalToken ? "EXISTS" : "NOT FOUND"
          );
          console.log(
            "- User in localStorage:",
            finalUser ? "EXISTS" : "NOT FOUND"
          );
          console.log("- Current Redux user:", user ? "EXISTS" : "NOT FOUND");

          if (!finalToken || !finalUser) {
            console.error("CRITICAL: Auth data lost before booking step!");
            alert("Authentication was lost. Please try again.");
            setStep("details");
            setOtpSent(false);
            return;
          }

          // Go directly to booking - no dashboard choice
          setStep("booking");
        }, 1000); // Increased delay to ensure Redux state is fully persisted
      } else {
        // Handle both JSON and non-JSON error responses
        let errorMessage = "Invalid OTP";
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch {
          // If JSON parsing fails, try to get the text response
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage = `Error ${response.status}: ${response.statusText}`;
          }
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const updateClientProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(
        "Updating client profile with token:",
        token ? "EXISTS" : "NOT FOUND"
      );

      if (!token) {
        console.error("No token available for profile update");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/client/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            full_name: userDetails.full_name,
            phone: userDetails.phone,
            preferred_consultation_type: bookingData.consultation_type,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Client profile updated successfully:", result);
      } else {
        const error = await response.text();
        console.log("Client profile update failed:", error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      console.log("=== BOOKING ATTEMPT DEBUG ===");
      console.log("Token from localStorage:", token ? "EXISTS" : "NOT FOUND");
      console.log(
        "User from localStorage:",
        storedUser ? "EXISTS" : "NOT FOUND"
      );
      console.log("User from Redux:", user ? "EXISTS" : "NOT FOUND");
      console.log("Is Redux authenticated:", user ? "YES" : "NO");

      // Try to recover from localStorage if Redux is empty
      if (!token && !user) {
        console.log("ERROR: No authentication found anywhere");
        alert("Authentication session expired. Please verify OTP again.");
        setStep("details");
        setOtpSent(false);
        return;
      }

      // If token exists but no Redux user, try to hydrate from localStorage
      if (token && storedUser && !user) {
        console.log(
          "Found token and user in localStorage but not in Redux - attempting to sync"
        );
        try {
          const parsedUser = JSON.parse(storedUser);
          dispatch(
            setCredentials({
              token: token,
              user: parsedUser,
              role: parsedUser.role,
            })
          );
          console.log("Successfully synced auth state from localStorage");
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          alert("Authentication data is corrupted. Please verify OTP again.");
          setStep("details");
          setOtpSent(false);
          return;
        }
      }

      // Final validation
      if (!token) {
        console.log("ERROR: No token available for booking");
        alert("Authentication session expired. Please verify OTP again.");
        setStep("details");
        setOtpSent(false);
        return;
      }

      const bookingPayload = {
        lawyer_id: lawyerId,
        consultation_type: bookingData.consultation_type,
        case_description:
          bookingData.case_description || "Quick booking from search",
        scheduled_time: new Date(
          `${bookingData.preferred_date}T${bookingData.preferred_time}:00`
        ).toISOString(),
      };

      console.log("Booking payload:", bookingPayload);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/client/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingPayload),
        }
      );

      if (response.ok) {
        alert(
          "Consultation booked successfully! Redirecting to your appointments..."
        );

        // Small delay to ensure authentication state is properly set before navigation
        setTimeout(() => {
          navigate("/my-appointments");
        }, 300);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to book consultation");
      }
    } catch (error) {
      console.error("Error booking consultation:", error);
      alert("Failed to book consultation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Lawyer Not Found
            </h1>
            <button
              onClick={() => navigate("/search-lawyers")}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
            >
              Back to Search
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative navbar-spacing pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/hero.jpg"
            alt="Legal background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-4xl sm:text-5xl font-light mb-6">
              Quick{" "}
              <span className="text-yellow-500">Consultation Booking</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Book your legal consultation in just 2 simple steps
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-center space-x-8">
                <div
                  className={`flex items-center ${
                    step === "details" ? "text-yellow-600" : "text-green-600"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                        step === "details"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {step === "booking" ? (
                        <i className="fas fa-check text-xl"></i>
                      ) : (
                        <img
                          src="/booking-step-1.webp"
                          alt="Step 1"
                          className="w-8 h-8 object-contain"
                        />
                      )}
                    </div>
                    <span className="font-semibold">Your Details</span>
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-300 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      step === "booking"
                        ? "bg-green-500 w-full"
                        : "bg-yellow-500 w-1/2"
                    }`}
                  ></div>
                </div>
                <div
                  className={`flex items-center ${
                    step === "booking" ? "text-yellow-600" : "text-gray-400"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                        step === "booking"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      <img
                        src="/booking-step-2.jpeg"
                        alt="Step 2"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="font-semibold">Book Appointment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Lawyer Info - Always Visible */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-8">
                  <div className="text-center mb-6">
                    <img
                      src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`}
                      alt={lawyer.full_name}
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {lawyer.full_name}
                    </h3>
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star text-sm ${
                              i < Math.floor(lawyer.average_rating || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          ></i>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {Number(lawyer.average_rating || 0).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Specialization
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {lawyer.specialization?.map((spec, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Experience
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {lawyer.years_experience || 0} years
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Location</div>
                      <div className="text-sm font-medium text-gray-900">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        {lawyer.city}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Consultation Fee
                      </div>
                      <div className="text-2xl font-bold text-primary-600">
                        ₹{Number(lawyer.fee_structure?.consultation || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-2">
                {step === "details" && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Enter Your Details
                    </h2>

                    {!otpSent ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={userDetails.full_name}
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                full_name: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={userDetails.email}
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={userDetails.phone}
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 disabled:opacity-50 font-medium"
                        >
                          {submitting ? "Sending OTP..." : "Send OTP"}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="text-center mb-4">
                          <p className="text-gray-600">
                            We've sent an OTP to{" "}
                            <strong>{userDetails.email}</strong>
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter OTP *
                          </label>
                          <input
                            type="text"
                            value={userDetails.otp}
                            onChange={(e) =>
                              setUserDetails({
                                ...userDetails,
                                otp: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-center text-lg"
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            required
                          />
                        </div>
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setOtpSent(false)}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 font-medium"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 disabled:opacity-50 font-medium"
                          >
                            {submitting ? "Verifying..." : "Verify & Continue"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {step === "booking" && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Book Your Consultation
                    </h2>

                    <form onSubmit={handleBooking} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Consultation Type
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label
                            className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              bookingData.consultation_type === "online"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="consultation_type"
                              value="online"
                              checked={
                                bookingData.consultation_type === "online"
                              }
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  consultation_type: e.target.value,
                                })
                              }
                              className="sr-only"
                            />
                            <img
                              src="/vedio consultation.png"
                              alt="Video consultation"
                              className="w-8 h-8 object-contain"
                            />
                            <div>
                              <div className="font-semibold">Video Call</div>
                              <div className="text-sm text-gray-600">
                                Online consultation
                              </div>
                            </div>
                          </label>
                          <label
                            className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              bookingData.consultation_type === "offline"
                                ? "border-yellow-500 bg-yellow-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="consultation_type"
                              value="offline"
                              checked={
                                bookingData.consultation_type === "offline"
                              }
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  consultation_type: e.target.value,
                                })
                              }
                              className="sr-only"
                            />
                            <img
                              src="/in-person-consultation.png"
                              alt="In-person consultation"
                              className="w-8 h-8 object-contain"
                            />
                            <div>
                              <div className="font-semibold">In-Person</div>
                              <div className="text-sm text-gray-600">
                                Office visit
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Case Description (Optional)
                        </label>
                        <textarea
                          value={bookingData.case_description}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              case_description: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Brief description of your legal matter (optional)"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            value={bookingData.preferred_date}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                preferred_date: e.target.value,
                              })
                            }
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Time *
                          </label>
                          <select
                            value={bookingData.preferred_time}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                preferred_time: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                          >
                            <option value="">Select Time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Booking Summary
                        </h3>
                        <div className="flex justify-between items-center">
                          <span>Consultation Fee:</span>
                          <span className="font-bold text-primary-600">
                            ₹
                            {Number(lawyer.fee_structure?.consultation || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          * Payment will be collected after lawyer confirmation
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-center space-x-3">
                          <img
                            src="/secure-payment.png"
                            alt="Secure payment"
                            className="w-6 h-6 object-contain"
                          />
                          <span className="text-sm text-gray-600 font-medium">
                            Secure & encrypted booking process
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {submitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                            <span>Booking...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <img
                              src="/booking-step-3.webp"
                              alt="Book"
                              className="w-5 h-5 object-contain"
                            />
                            <span>Book Consultation</span>
                          </div>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuickBooking;
