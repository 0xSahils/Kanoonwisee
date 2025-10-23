import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { authAPI } from "../api/auth";
import { verifyOtp } from "../store/slices/authSlice";
import { store } from "../store"; // Import the store directly
import axiosInstance from "../api/index";
import { CheckCircle } from "lucide-react";

const LawyerInvitation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState("registration"); // "registration", "otp", "profile", "success"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");

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
      const file = files && files.length ? files[0] : null;
      
      // File validation
      if (file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          toast.error(`File size too large. Maximum size is 5MB.`);
          e.target.value = ''; // Clear the input
          return;
        }

        // Validate file types
        if (name === 'resumeFile' && file.type !== 'application/pdf') {
          toast.error('Resume must be a PDF file.');
          e.target.value = '';
          return;
        }
        
        if (name === 'barRegistrationFile') {
          const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
          if (!validTypes.includes(file.type)) {
            toast.error('Bar registration must be a PDF or image file (JPEG, PNG).');
            e.target.value = '';
            return;
          }
        }
        
        if (name === 'photoFile') {
          const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
          if (!validTypes.includes(file.type)) {
            toast.error('Photo must be an image file (JPEG, PNG).');
            e.target.value = '';
            return;
          }
        }
      }

      setFormData({
        ...formData,
        [name]: file,
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
      // Use Redux to verify OTP and establish session
      await dispatch(verifyOtp({ email: formData.email, otp })).unwrap();

      // Wait a moment for Redux state to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get fresh Redux state directly from store
      const freshAuthState = store.getState().auth;

      // If Redux state is still not updated, there might be an issue with the reducer
      if (!freshAuthState.isAuthenticated) {
        console.error("Redux state not updated after OTP verification");
        toast.error("Authentication failed. Please try again.");
        return;
      }

      toast.success("Email verified successfully!");
      setStep("profile");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error || "Invalid OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Create lawyer profile
  const handleProfileSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Manually fetch CSRF token to ensure it's ready
      try {
        await axiosInstance.get("/auth/csrf-token");
      } catch (csrfError) {
        console.error("Failed to fetch CSRF token:", csrfError);
        toast.error("Session setup failed. Please try again.");
        return;
      }

      // Parse experience to get numeric value
      const experienceYears = formData.experience.includes("-")
        ? parseInt(formData.experience.split("-")[0])
        : parseInt(formData.experience.replace("+", ""));

      // Check if any files are selected
      const hasFiles = formData.photoFile || formData.resumeFile || formData.barRegistrationFile;

      if (hasFiles) {
        // Create FormData for file upload
        const formDataToSend = new FormData();
        
        // Get CSRF token and add it to FormData
        try {
          const csrfResponse = await axiosInstance.get("/auth/csrf-token");
          const csrfToken = csrfResponse.data.csrfToken;
          if (csrfToken) {
            formDataToSend.append('csrfToken', csrfToken);
          }
        } catch (csrfError) {
          console.error("Failed to get CSRF token:", csrfError);
          toast.error("Security setup failed. Please try again.");
          return;
        }
        
        // Add text fields
        formDataToSend.append('full_name', formData.fullName);
        formDataToSend.append('bar_registration_number', formData.barRegistration);
        formDataToSend.append('specialization', JSON.stringify([formData.specialization]));
        formDataToSend.append('court_practice', JSON.stringify([formData.courtPractice]));
        formDataToSend.append('fee_structure', JSON.stringify({
          consultation: 1000,
          court: 5000,
        }));
        formDataToSend.append('years_experience', experienceYears);
        formDataToSend.append('languages', JSON.stringify(formData.languages.length > 0 ? formData.languages : ["English", "Hindi"]));
        formDataToSend.append('city', formData.city);
        formDataToSend.append('consultation_type', 'both');
        
        // Add message if provided
        if (formData.message) {
          formDataToSend.append('message', formData.message);
        }

        // Add files if selected
        if (formData.photoFile) {
          formDataToSend.append('photo', formData.photoFile);
        }
        if (formData.resumeFile) {
          formDataToSend.append('cv', formData.resumeFile);
        }
        if (formData.barRegistrationFile) {
          formDataToSend.append('bar_registration_certificate', formData.barRegistrationFile);
        }

        // Send FormData with files
        await axiosInstance.put("/lawyer/profile", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 60000, // 60 second timeout for file uploads
        });
      } else {
        // Send JSON data when no files
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
          languages: formData.languages.length > 0 ? formData.languages : ["English", "Hindi"],
          city: formData.city,
          consultation_type: "both", // Default to both online and offline
        };

        // Add message if provided
        if (formData.message) {
          profileData.message = formData.message;
        }

        // Use the configured axios instance with cookie authentication
        await axiosInstance.put("/lawyer/profile", profileData);
      }

      toast.success("Registration completed successfully!");
      setStep("success");

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error creating profile:", error);

      // Check for specific error codes
      if (
        error.response?.status === 403 &&
        error.response.data?.code?.includes("CSRF")
      ) {
        toast.error("Security token expired. Please refresh and try again.");
      } else if (error.response?.status === 401) {
        toast.error("Authentication failed. Please verify your OTP again.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to create profile"
        );
      }
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
      <section className="relative navbar-spacing-simple pb-16 bg-gradient-to-br from-primary-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Invitation Banner */}
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/legal-pattern.svg')] opacity-5"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500 rounded-full filter blur-[150px] opacity-10"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full filter blur-[100px] opacity-10"></div>
        </div>

        <div className="container-custom relative z-10 pt-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 border border-yellow-500/30 mb-6">
              <div className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full">
                <i className="fas fa-check text-gray-900 text-xs"></i>
              </div>
              <span className="text-sm font-semibold text-yellow-400">
                🇮🇳 Join India's Premier Legal Network
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              An Invitation to India's <span className="text-gradient bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent">Leading Legal Professionals</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our platform to enhance your professional visibility and connect with clients seeking expert legal representation
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Left Content */}
            <div className="space-y-8 bg-blue-900/30 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm shadow-xl">
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  An Invitation to
                  <span className="text-yellow-400"> Legal Professionals</span>
                </h1>
                <div className="space-y-6 mt-8">
                  <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-500/30 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <i className="fas fa-eye text-blue-300 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-300 mb-2">Enhance Your Professional Visibility</h3>
                      <p className="text-gray-300">Our platform provides a professional space where your verified credentials, experience, and areas of specialization are clearly presented to potential clients seeking legal expertise.</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-900/30 p-6 rounded-xl border border-indigo-500/30 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 flex items-start">
                    <div className="bg-indigo-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <i className="fas fa-book text-indigo-300 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-300 mb-2">Become a Thought Leader</h3>
                      <p className="text-gray-300">Publish scholarly articles in our "Legal Insights" library and gain opportunities to host paid workshops and webinars, establishing your authority on a national stage.</p>
                    </div>
                  </div>
                  
                  <div className="bg-cyan-900/30 p-6 rounded-xl border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex items-start">
                    <div className="bg-cyan-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <i className="fas fa-tools text-cyan-300 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 mb-2">Access Powerful Practice Tools</h3>
                      <p className="text-gray-300">Utilize our secure platform to manage your professional profile and streamline consultations. We also provide a comprehensive library of bilingual (English & Hindi) legal templates to enhance your efficiency.</p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 flex items-start">
                    <div className="bg-purple-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <i className="fas fa-chart-line text-purple-300 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-300 mb-2">A Commitment to Your Growth</h3>
                      <p className="text-gray-300">We are invested in your success. Our partners receive assistance in building their professional social media presence and support for their academic activities. Our future roadmap includes providing our partners with access to leading legal databases to support their practice.</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-500/30 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <i className="fas fa-balance-scale text-blue-300 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-300 mb-2">An Ethical Framework</h3>
                      <p className="text-gray-300">Our platform operates on a transparent, BCI-compliant subscription model for its technology services. We do not engage in fee-splitting and will never take a commission on your professional fees.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 p-6 rounded-xl border border-yellow-500/30 shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 flex items-start">
                    <div className="bg-yellow-500/20 p-3 rounded-lg mr-4 flex-shrink-0">
                      <i className="fas fa-crown text-yellow-300 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-300 mb-2">The Founding Member Invitation</h3>
                      <p className="text-gray-300">We invite the first 100 verified legal professionals to join as founding members. As a founding member, you will receive a full five-year waiver of all platform technology fees and will be given priority opportunities to be a part of the Kanoonwise Academy as an instructor.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Professional Lawyers Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-[450px] border-2 border-yellow-500/30 shadow-[0_0_25px_rgba(234,179,8,0.2)] transform hover:scale-[1.02] transition-all duration-300">
                <img
                  src="/lawyer-invitation.jpg"
                  alt="Professional Advocates in Indian Courtroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Floating Stats */}
                <div className="absolute top-6 right-6 bg-blue-900/80 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">100</div>
                    <div className="text-xs text-gray-300">Founding Member Spots</div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-xl font-semibold text-white mb-2">
                    Join India's Premier Legal Network
                  </p>
                  <p className="text-sm text-gray-200 mb-4">
                    Submit your credentials for our verification process and become part of India's most trusted legal platform.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-300">
                    <span className="flex items-center"><i className="fas fa-check-circle text-green-400 mr-1"></i> Verified Credentials</span>
                    <span className="flex items-center"><i className="fas fa-check-circle text-green-400 mr-1"></i> BCI Compliant</span>
                    <span className="flex items-center"><i className="fas fa-check-circle text-green-400 mr-1"></i> Nationwide Reach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Join <span className="text-yellow-400">Kanoonwise</span>?</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">Our platform offers unique advantages for legal professionals looking to expand their practice and establish their expertise.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-users text-6xl text-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></i>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                  <h3 className="text-xl font-bold text-white">Expanded Client Reach</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300">Connect with clients across India seeking specialized legal expertise in your practice areas.</p>
                <div className="mt-4 flex items-center text-blue-400">
                  <span className="text-sm font-medium">Learn more</span>
                  <i className="fas fa-arrow-right ml-2 text-xs group-hover:ml-3 transition-all duration-300"></i>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500/30 transition-all duration-300 group">
              <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-laptop text-6xl text-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></i>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                  <h3 className="text-xl font-bold text-white">Digital Presence</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300">Establish a professional online profile that showcases your expertise and builds credibility with potential clients.</p>
                <div className="mt-4 flex items-center text-purple-400">
                  <span className="text-sm font-medium">Learn more</span>
                  <i className="fas fa-arrow-right ml-2 text-xs group-hover:ml-3 transition-all duration-300"></i>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-yellow-500/30 transition-all duration-300 group">
              <div className="h-48 bg-gradient-to-r from-yellow-600 to-orange-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-certificate text-6xl text-white opacity-20 group-hover:opacity-30 transition-opacity duration-300"></i>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                  <h3 className="text-xl font-bold text-white">Professional Growth</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300">Access resources, networking opportunities, and tools to enhance your practice and professional development.</p>
                <div className="mt-4 flex items-center text-yellow-400">
                  <span className="text-sm font-medium">Learn more</span>
                  <i className="fas fa-arrow-right ml-2 text-xs group-hover:ml-3 transition-all duration-300"></i>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Banner */}
          <div className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 shadow-xl border border-blue-700/30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">Ready to Join India's Premier Legal Network?</h3>
                <p className="text-blue-200">Complete the registration form below to begin the verification process.</p>
              </div>
              <div className="flex-shrink-0">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center">
                  <span>Register Now</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
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
            <div className="text-center p-6 rounded-xl bg-white border">
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

            <div className="text-center p-6 rounded-xl bg-white border">
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

            <div className="text-center p-6 rounded-xl bg-white border">
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
      <section className="py-16 px-4 bg-primary-900 text-white form">
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
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                    className="w-full px-4 py-3 border text-black  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                        placeholder={
                          formData.languages.length === 0
                            ? "Type a language and select to add"
                            : "Add another language..."
                        }
                        className="flex-1 min-w-[120px] outline-none bg-transparent"
                      />
                    </div>

                    {/* Dropdown */}
                    {showLanguageDropdown && filteredLanguages.length > 0 && (
                      <div className="absolute z-20 mt-1 w-full bg-white border text-black border-gray-200 rounded-xl shadow-lg max-h-48 overflow-auto">
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
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                    <span className="text-xs text-gray-500 block font-normal">Max 5MB</span>
                  </label>
                  <input
                    type="file"
                    name="resumeFile"
                    accept="application/pdf"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                  {formData.resumeFile && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {formData.resumeFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bar Registration (PDF/Image)
                    <span className="text-xs text-gray-500 block font-normal">Max 5MB</span>
                  </label>
                  <input
                    type="file"
                    name="barRegistrationFile"
                    accept="application/pdf,image/*"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                  {formData.barRegistrationFile && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {formData.barRegistrationFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photo to display (Image)
                    <span className="text-xs text-gray-500 block font-normal">Max 5MB</span>
                  </label>
                  <input
                    type="file"
                    name="photoFile"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                  {formData.photoFile && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {formData.photoFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="btn-primary w-full py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="btn-primary w-full py-4 rounded-xl"
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
                className="btn-primary w-full py-4 rounded-xl"
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
