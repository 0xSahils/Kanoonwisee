import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { authAPI } from "../api/auth";

const LawyerInvitation = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState("registration"); // "registration", "otp", "profile", "success"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const [userTokens, setUserTokens] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    barRegistration: "",
    experience: "",
    specialization: "",
    secondarySpecialization: "",
    languages: [],
    resumeFile: null,
    barRegistrationFile: null,
    photoFile: null,
    city: "",
    courtPractice: "",
    message: "",
  });

  // Local state for language autocomplete
  const [languageQuery, setLanguageQuery] = useState("");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languageOptions = [
    "English",
    "Hindi",
    "Bengali",
    "Marathi",
    "Telugu",
    "Tamil",
    "Gujarati",
    "Urdu",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punjabi",
    "Assamese",
    "Maithili",
  ];

  const filteredLanguages = languageOptions
    .filter((l) => l.toLowerCase().includes(languageQuery.toLowerCase()))
    .filter((l) => !formData.languages.includes(l));

  const handleAddLanguage = (lang) => {
    if (!formData.languages.includes(lang)) {
      setLanguageQuery(lang); // Show selected language in input box
      setTimeout(() => {
        setFormData({ ...formData, languages: [...formData.languages, lang] });
        setLanguageQuery(""); // Clear input after adding to tags
        setShowLanguageDropdown(false);
      }, 50); // Small delay to show the selected language
    }
  };

  const handleRemoveLanguage = (lang) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l) => l !== lang),
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, files, selectedOptions } = e.target;
    // Handle file inputs and multi-selects
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files && files.length ? files[0] : null,
      });
      return;
    }
    if (name === "languages") {
      const values = Array.from(selectedOptions).map((o) => o.value);
      setFormData({ ...formData, languages: values });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 1: Send OTP to email
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.email || !formData.fullName || !formData.barRegistration) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await authAPI.requestOtp(formData.email, "lawyer");
      toast.success("OTP sent to your email!");
      setStep("otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authAPI.verifyOtp(formData.email, otp);
      setUserTokens(response.data);
      toast.success("Email verified successfully!");
      setStep("profile");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Create lawyer profile
  const handleProfileSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Parse experience to get numeric value
      const experienceYears = formData.experience.includes("-")
        ? parseInt(formData.experience.split("-")[0])
        : parseInt(formData.experience.replace("+", ""));

      const profileData = {
        full_name: formData.fullName,
        bar_registration_number: formData.barRegistration,
        specialization: [formData.specialization],
        court_practice: [formData.courtPractice],
        fee_structure: {
          consultation: 1000, // Default consultation fee
          court: 5000, // Default court fee
        },
        years_experience: experienceYears,
        languages: ["English", "Hindi"], // Default languages
        city: formData.city,
        consultation_type: "both", // Default to both online and offline
      };

      // Create axios instance with the token for this specific request
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const response = await fetch(`${API_BASE_URL}/lawyer/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userTokens.token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create profile");
      }

      toast.success("Registration completed successfully!");
      setStep("success");

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error(error.message || "Failed to create profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const specializations = [
    "Criminal Law",
    "Civil Law",
    "Corporate Law",
    "Family Law",
    "Property Law",
    "Labour Law",
    "Tax Law",
    "Constitutional Law",
    "Consumer Law",
    "Banking Law",
    "Insurance Law",
    "Intellectual Property",
  ];

  const courts = [
    "Supreme Court of India",
    "High Court",
    "District Court",
    "Sessions Court",
    "Magistrate Court",
    "Tribunal",
    "Consumer Court",
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative navbar-spacing-simple pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 border border-yellow-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full">
                  <i className="fas fa-check text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  🇮🇳 Join India's Legal Network
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Expand Your
                  <span className="text-yellow-400"> Legal Practice</span>
                  <br />
                  <span className="text-orange-400">Connect with Clients</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Join India's most trusted legal platform. Connect with clients
                  seeking expert legal representation across constitutional,
                  civil, criminal, and corporate matters nationwide.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    5,000+
                  </div>
                  <div className="text-sm text-gray-300">Active Advocates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    25,000+
                  </div>
                  <div className="text-sm text-gray-300">Cases Handled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">50+</div>
                  <div className="text-sm text-gray-300">Cities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    4.8/5
                  </div>
                  <div className="text-sm text-gray-300">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Professional Lawyers Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 border border-yellow-500/30">
                <img
                  src="/lawyer-invitation.jpg"
                  alt="Professional Advocates in Indian Courtroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">
                    Join India's Premier Legal Network
                  </p>
                  <p className="text-sm opacity-90">
                    Connect with clients nationwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Leading Advocates Choose KanoonWise
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Premium Client Base
              </h3>
              <p className="text-gray-600">
                Connect with verified clients seeking quality legal
                representation across India.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Grow Your Practice
              </h3>
              <p className="text-gray-600">
                Expand your reach beyond local boundaries and build a nationwide
                clientele.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trusted Platform
              </h3>
              <p className="text-gray-600">
                Join a platform trusted by legal professionals and backed by
                secure technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {step === "registration" && "Register Your Practice Today"}
              {step === "otp" && "Verify Your Email"}
              {step === "profile" && "Complete Your Profile"}
              {step === "success" && "Registration Successful!"}
            </h2>
            <p className="text-gray-300">
              {step === "registration" &&
                "Fill out the form below and we'll send you an OTP for verification."}
              {step === "otp" &&
                "Please enter the 6-digit OTP sent to your email address."}
              {step === "profile" &&
                "Setting up your profile to start receiving client requests..."}
              {step === "success" &&
                "Welcome to KanoonWise! You'll be redirected to login shortly."}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === "registration"
                    ? "bg-yellow-500 text-gray-900"
                    : step !== "registration"
                    ? "bg-green-500 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}
              >
                1
              </div>
              <div className="w-12 h-1 bg-gray-600"></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === "otp"
                    ? "bg-yellow-500 text-gray-900"
                    : step === "profile" || step === "success"
                    ? "bg-green-500 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}
              >
                2
              </div>
              <div className="w-12 h-1 bg-gray-600"></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === "profile"
                    ? "bg-yellow-500 text-gray-900"
                    : step === "success"
                    ? "bg-green-500 text-white"
                    : "bg-gray-600 text-gray-300"
                }`}
              >
                3
              </div>
            </div>
          </div>

          {/* Registration Form - Step 1 */}
          {step === "registration" && (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Adv. Your Full Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bar Registration Number *
                  </label>
                  <input
                    type="text"
                    name="barRegistration"
                    value={formData.barRegistration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g., MH/1234/2020"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="16-20">16-20 years</option>
                    <option value="20+">20+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Secondary Specialization (optional)
                  </label>
                  <select
                    name="secondarySpecialization"
                    value={formData.secondarySpecialization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Select Secondary Specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Languages Known
                  </label>
                  <div className="relative">
                    {/* Input container with tags inside */}
                    <div className="w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-yellow-500 focus-within:border-yellow-500 bg-white flex flex-wrap items-center gap-2">
                      {/* Tags inside input */}
                      {formData.languages.map((lang) => (
                        <span
                          key={lang}
                          className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm"
                        >
                          {lang}
                          <button
                            type="button"
                            aria-label={`Remove ${lang}`}
                            onClick={() => handleRemoveLanguage(lang)}
                            className="text-yellow-700 hover:text-yellow-900 text-xs"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      
                      {/* Autocomplete input */}
                      <input
                        type="text"
                        value={languageQuery}
                        onChange={(e) => {
                          setLanguageQuery(e.target.value);
                          setShowLanguageDropdown(true);
                        }}
                        onFocus={() => setShowLanguageDropdown(true)}
                        onBlur={() =>
                          setTimeout(() => setShowLanguageDropdown(false), 150)
                        }
                        placeholder={formData.languages.length === 0 ? "Type a language and select to add" : "Add another language..."}
                        className="flex-1 min-w-[120px] outline-none bg-transparent"
                      />
                    </div>

                    {/* Dropdown */}
                    {showLanguageDropdown && filteredLanguages.length > 0 && (
                      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-auto">
                        {filteredLanguages.map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-yellow-50"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleAddLanguage(lang)}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City of Practice *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Court Practice *
                  </label>
                  <select
                    name="courtPractice"
                    value={formData.courtPractice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Select Primary Court</option>
                    {courts.map((court) => (
                      <option key={court} value={court}>
                        {court}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  More about yourself
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Share your practice areas, notable cases, achievements, bar memberships, publications, or anything else you'd like clients to know."
                ></textarea>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Add Resume/CV (PDF)
                  </label>
                  <input
                    type="file"
                    name="resumeFile"
                    accept="application/pdf"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bar Registration (PDF/Image)
                  </label>
                  <input
                    type="file"
                    name="barRegistrationFile"
                    accept="application/pdf,image/*"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photo to display (Image)
                  </label>
                  <input
                    type="file"
                    name="photoFile"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  {isSubmitting ? "Sending OTP..." : "Send OTP"}
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  By submitting, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </form>
          )}

          {/* OTP Verification - Step 2 */}
          {step === "otp" && (
            <form
              onSubmit={handleOtpSubmit}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 max-w-md mx-auto"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-envelope text-yellow-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-600">
                  We've sent a 6-digit verification code to
                  <br />
                  <span className="font-semibold">{formData.email}</span>
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter 6-digit OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength="6"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.length !== 6}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => setStep("registration")}
                className="w-full mt-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Back to Registration
              </button>
            </form>
          )}

          {/* Profile Setup - Step 3 */}
          {step === "profile" && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 max-w-md mx-auto text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-check text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Setting up your profile...
              </h3>
              <p className="text-gray-600 mb-6">
                We're creating your lawyer profile with the information you
                provided.
              </p>

              {isSubmitting ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mb-4"></div>
                  <p className="text-gray-500">Creating your profile...</p>
                </div>
              ) : (
                <button
                  onClick={handleProfileSubmit}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300"
                >
                  Complete Registration
                </button>
              )}
            </div>
          )}

          {/* Success - Step 4 */}
          {step === "success" && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 max-w-md mx-auto text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Welcome to KanoonWise!
              </h3>
              <p className="text-gray-600 mb-6">
                Your registration is complete. You can now log in and start
                receiving client requests.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Next Steps:</strong>
                  <br />
                  • Log in to complete your detailed profile
                  <br />
                  • Set your consultation fees
                  <br />• Start receiving client bookings
                </p>
              </div>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LawyerInvitation;
