import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Calendar, Clock, Shield, Award } from "lucide-react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const PublicLawyerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/public/lawyers/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setLawyer(data);
          // If there are reviews in the data, set them
          if (data.reviews) {
            setReviews(data.reviews);
          }
        } else {
          console.error("Failed to fetch lawyer:", response.status);
        }
      } catch (error) {
        console.error("Error fetching lawyer:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLawyer();
    }
  }, [id]);

  const handleBookConsultation = () => {
    navigate(`/quick-book/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
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
            <p className="text-gray-600 mb-6">
              The lawyer profile you're looking for doesn't exist or has been
              removed.
            </p>
            <button
              onClick={() => navigate("/search-lawyers")}
              className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-md hover:bg-yellow-600 font-semibold"
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
      <section className="relative pt-32 pb-12 bg-white">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/hero.jpg"
            alt="Legal background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block w-16 h-1 bg-accent-500 mb-6"></div>
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4 text-gray-900">
              Legal Expert Profile
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Get to know your legal expert and book a consultation
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          {/* Header Section */}
          <div className="bg-white p-8 sm:p-12 border-b">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face`}
                    alt={lawyer.full_name}
                    className="w-40 h-40 rounded-2xl object-cover shadow-lg border-4 border-white"
                  />
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-grow text-center lg:text-left">
                <div className="mb-6">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {lawyer.full_name}
                  </h1>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500 text-gray-900 font-semibold text-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Verified Legal Expert
                  </div>
                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center lg:justify-start">
                    <div className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                      ₹
                      {Number(
                        lawyer.fee_structure?.consultation || 0
                      ).toLocaleString()}
                      <span className="text-lg font-semibold text-gray-700"> / hour</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold tracking-wide text-gray-600 uppercase">
                      Consultation Fee
                    </span>
                  </div>
                  <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-2xl">
                    Experienced lawyer with {lawyer.years_experience || 0} years
                    of practice, specializing in providing comprehensive legal
                    solutions.
                  </p>
                </div>

                {/* Rating and Stats */}
                <div className="flex flex-col sm:flex-row gap-8 items-center lg:items-start">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(lawyer.average_rating || 0)
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Number(lawyer.average_rating || 0).toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on {lawyer.review_count || 0} reviews
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {lawyer.years_experience || 0}+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      ₹
                      {Number(
                        lawyer.fee_structure?.consultation || 0
                      ).toLocaleString()}
                      <span className="text-base font-semibold text-gray-700"> / hour</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-600 uppercase">
                      Consultation Fee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-8 sm:p-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Specializations */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-6 h-6 text-yellow-500 mr-3" />
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {lawyer.specialization?.map((spec, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium border border-yellow-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Court Practice */}
                {lawyer.court_practice && lawyer.court_practice.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Calendar className="w-6 h-6 text-yellow-500 mr-3" />
                      Court Practice
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {lawyer.court_practice.map((court, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{court}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {lawyer.languages && lawyer.languages.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Languages Spoken
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {lawyer.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Section */}
                {reviews && reviews.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Client Reviews
                    </h2>
                    <div className="space-y-6">
                      {reviews.slice(0, 3).map((review, index) => (
                        <div
                          key={index}
                          className="p-6 bg-gray-50 rounded-xl border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <div className="font-medium text-gray-900">
                                {review.client_name || "Anonymous"}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Contact & Booking */}
              <div className="space-y-6">
                {/* Location */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-yellow-500 mr-2" />
                    Location
                  </h3>
                  <p className="text-gray-700">
                    {lawyer.city || "Not specified"}
                  </p>
                </div>

                {/* Consultation Types */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                    Consultation Options
                  </h3>
                  <div className="space-y-3">
                    {(lawyer.consultation_type === "both" ||
                      lawyer.consultation_type === "online" ||
                      !lawyer.consultation_type) && (
                      <div className="flex items-center p-3 bg-white rounded-lg border">
                        <img
                          src="/vedio consultation.png"
                          alt="Video consultation"
                          className="w-6 h-6 mr-3"
                        />
                        <span className="text-gray-700">Video Call</span>
                      </div>
                    )}
                    {(lawyer.consultation_type === "both" ||
                      lawyer.consultation_type === "offline") && (
                      <div className="flex items-center p-3 bg-white rounded-lg border">
                        <img
                          src="/in-person-consultation.png"
                          alt="In-person consultation"
                          className="w-6 h-6 mr-3"
                        />
                        <span className="text-gray-700">In-Person Meeting</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Action */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Ready to Get Legal Help?
                  </h3>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ₹
                      {Number(
                        lawyer.fee_structure?.consultation || 0
                      ).toLocaleString()}
                      <span className="text-base font-semibold text-gray-700"> / hour</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-600 uppercase">
                      Consultation Fee
                    </div>
                  </div>
                  <button
                    onClick={handleBookConsultation}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Book Consultation
                  </button>
                  <p className="text-xs text-gray-600 text-center mt-3">
                    * Payment after lawyer confirmation
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-green-800 mb-2">
                      Verified & Trusted
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>✓ Identity Verified</li>
                      <li>✓ Bar Registration Confirmed</li>
                      <li>✓ Background Checked</li>
                      <li>✓ Client Reviews Verified</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PublicLawyerProfile;
