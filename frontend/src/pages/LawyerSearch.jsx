import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/landing/Header.jsx";
import Footer from "../components/landing/Footer.jsx";

const LawyerSearch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    specialization: searchParams.get("specialization") || "",
    experience: searchParams.get("experience") || "",
    sortBy: "rating",
  });
  const [searchInput, setSearchInput] = useState(
    searchParams.get("city") || ""
  );

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, city: searchInput }));
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (filters.city) params.append("city", filters.city);
        if (filters.specialization)
          params.append("specialization", filters.specialization);
        if (filters.experience)
          params.append("min_experience", filters.experience);

        // Add pagination
        params.append("page", "1");
        params.append("limit", "20");

        const apiUrl = `${
          import.meta.env.VITE_API_URL
        }/public/lawyers/search?${params.toString()}`;

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();

          // Transform backend data to frontend format
          const transformedLawyers = data.lawyers.map((lawyer) => ({
            id: lawyer.id,
            name:
              lawyer.full_name ||
              "Adv. " + (lawyer.User?.email?.split("@")[0] || "Unknown"),
            specialization: lawyer.specialization || [],
            experience: lawyer.years_experience || 0,
            city: lawyer.city || "Not specified",
            rating: parseFloat(lawyer.average_rating) || 0,
            reviews: parseInt(lawyer.review_count) || 0,
            image: `https://images.unsplash.com/photo-${
              Math.random() > 0.5
                ? "1507003211169-0a1dd7228f2d"
                : "1494790108755-2616b612b786"
            }?w=150&h=150&fit=crop&crop=face`,
            languages: lawyer.languages || ["English"],
            courtPractice: lawyer.court_practice || ["District Court"],
            consultationFee: lawyer.fee_structure?.consultation || 2000,
            verified: true,
            description:
              lawyer.bio ||
              `Experienced lawyer with ${
                lawyer.years_experience || 0
              } years of practice.`,
          }));

          // Sort lawyers based on sortBy filter
          if (filters.sortBy === "rating") {
            transformedLawyers.sort((a, b) => b.rating - a.rating);
          } else if (filters.sortBy === "experience") {
            transformedLawyers.sort((a, b) => b.experience - a.experience);
          } else if (filters.sortBy === "fee") {
            transformedLawyers.sort(
              (a, b) => a.consultationFee - b.consultationFee
            );
          }

          setLawyers(transformedLawyers);
        } else {
          console.error("API failed:", response.status);
          setLawyers([]);
        }
      } catch (error) {
        console.error("Error fetching lawyers:", error);
        setLawyers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    if (key === "city") {
      setSearchInput(value);
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleBookConsultation = (lawyer) => {
    // Use quick booking flow for seamless experience
    navigate(`/quick-book/${lawyer.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom pt-20 pb-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
              Find Your Perfect{" "}
              <span className="text-yellow-500">Legal Expert</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {filters.city
                ? `${lawyers.length} verified lawyers found in ${filters.city}`
                : `${lawyers.length} verified lawyers ready to help you`}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Enhanced Filters */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Refine Your Search
              </h2>
              <p className="text-gray-600">
                Find the perfect lawyer for your specific needs
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-map-marker-alt text-yellow-500 mr-2"></i>
                  City
                </label>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  placeholder="Enter city name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-balance-scale text-yellow-500 mr-2"></i>
                  Specialization
                </label>
                <select
                  value={filters.specialization}
                  onChange={(e) =>
                    handleFilterChange("specialization", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="">All Specializations</option>
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Family Law">Family Law</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Banking Law">Banking Law</option>
                  <option value="Real Estate Law">Real Estate Law</option>
                  <option value="Health Law">Health Law</option>
                  <option value="Civil Law">Civil Law</option>
                  <option value="IT Law">IT Law</option>
                  <option value="Tax Law">Tax Law</option>
                  <option value="Employment Law">Employment Law</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-graduation-cap text-yellow-500 mr-2"></i>
                  Experience
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) =>
                    handleFilterChange("experience", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="">Any Experience</option>
                  <option value="1">1+ Years</option>
                  <option value="3">3+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                  <option value="15">15+ Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-sort text-yellow-500 mr-2"></i>Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="experience">Most Experience</option>
                  <option value="fee">Lowest Fee</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                <i className="fas fa-users text-yellow-500 mr-3"></i>
                Available Lawyers
              </h2>
              <div className="text-gray-600">
                Showing {lawyers.length} lawyers
              </div>
            </div>
          </div>

          {lawyers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No Lawyers Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any lawyers matching your current criteria. Try
                adjusting your search filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    city: "",
                    specialization: "",
                    experience: "",
                    sortBy: "rating",
                  })
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Lawyer Image */}
                    <div className="flex-shrink-0 self-center lg:self-start">
                      <div className="relative">
                        <img
                          src={lawyer.image}
                          alt={lawyer.name}
                          className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                        />
                        {lawyer.verified && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-check text-white text-sm"></i>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Lawyer Info */}
                    <div className="flex-grow">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                        <div className="mb-4 lg:mb-0">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {lawyer.name}
                            {lawyer.verified && (
                              <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                <i className="fas fa-shield-check mr-1"></i>
                                Verified Expert
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={`fas fa-star text-lg ${
                                    i < Math.floor(lawyer.rating)
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                ></i>
                              ))}
                              <span className="ml-3 text-lg font-semibold text-gray-700">
                                {lawyer.rating.toFixed(1)}
                              </span>
                              <span className="ml-2 text-gray-600">
                                ({lawyer.reviews} reviews)
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {lawyer.description}
                          </p>
                        </div>
                        <div className="text-center lg:text-right">
                          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                            <div className="text-3xl font-bold text-gray-900">
                              ₹{lawyer.consultationFee.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Consultation Fee
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <i className="fas fa-balance-scale text-yellow-500 mr-2"></i>
                            Specialization
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {lawyer.specialization.map((spec, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <i className="fas fa-graduation-cap text-yellow-500 mr-2"></i>
                            Experience & Location
                          </div>
                          <div className="space-y-2">
                            <div className="text-lg font-semibold text-gray-900">
                              {lawyer.experience} years experience
                            </div>
                            <div className="text-gray-700 flex items-center">
                              <i className="fas fa-map-marker-alt text-yellow-500 mr-2"></i>
                              {lawyer.city}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <i className="fas fa-language text-yellow-500 mr-2"></i>
                            Languages & Courts
                          </div>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {lawyer.languages?.map((lang, index) => (
                                <span
                                  key={index}
                                  className="text-sm bg-white px-2 py-1 rounded-md border"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-gray-600">
                              {lawyer.courtPractice?.slice(0, 2).join(", ")}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-gray-600">
                            <i className="fas fa-clock text-yellow-500 mr-2"></i>
                            <span className="text-sm">
                              Usually responds in 1-2 hours
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() =>
                              navigate(`/lawyer-profile/${lawyer.id}`)
                            }
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => handleBookConsultation(lawyer)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                          >
                            <i className="fas fa-calendar-check mr-2"></i>
                            Book Consultation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LawyerSearch;
