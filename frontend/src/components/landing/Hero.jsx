import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Search handler
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append("city", selectedCity);
    if (searchQuery) params.append("specialization", searchQuery);
    navigate(`/search-lawyers?${params.toString()}`);
  };

  // Popular tag handler
  const handleTagClick = (tag) => {
    navigate(`/search-lawyers?specialization=${encodeURIComponent(tag)}`);
  };

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
  ];

  const popularSearches = [
    "Criminal Law Expert",
    "Family Law Specialist",
    "Corporate Law Advisor",
    "Property Law Consultant",
    "Civil Law Advocate",
    "Tax Law Expert",
    "Constitutional Law",
    "Consumer Protection",
  ];

  const stats = [
    { number: "5,000+", label: "Expert Advocates" },
    { number: "25,000+", label: "Legal Consultations" },
    { number: "50+", label: "Indian Cities" },
    { number: "4.8/5", label: "Client Rating" },
  ];

  return (
    <section className="relative bg-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-0"></div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] sm:min-h-[70vh]">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-3 sm:px-4 py-2 animate-fade-in">
              <div className="flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 bg-primary-900 rounded-full">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-primary-900">
                🇮🇳 India's Premier Legal Network
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6 animate-slide-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Connect with India's
                <span className="text-primary-900 font-extrabold">
                  {" "}
                  Best Advocates
                </span>
                <br />
                <span className="text-accent-500 font-bold">
                  Expert Legal Solutions
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                Access verified advocates across India for expert legal
                consultation. From Supreme Court to District Courts - find
                specialized legal expertise for your constitutional, civil,
                criminal, and corporate matters.
              </p>
            </div>

            {/* Search Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100">
                <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                  {/* City Selector */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-map-marker-alt text-primary-500 text-sm"></i>
                    </div>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    >
                      <option value="">Select City</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Input */}
                  <div className="relative md:col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-search text-primary-500 text-sm"></i>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for lawyers, legal services..."
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                  <button
                    onClick={handleSearch}
                    className="flex-1 btn-primary text-base sm:text-lg py-3 sm:py-4 rounded-lg sm:rounded-xl min-h-[44px]"
                  >
                    <i className="fas fa-search mr-2"></i>
                    Find Legal Help
                  </button>
                  <button
                    onClick={() => navigate("/join-as-lawyer")}
                    className="flex-1 bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors duration-200 text-base sm:text-lg min-h-[44px]"
                  >
                    <i className="fas fa-balance-scale mr-2"></i>
                    Join as Lawyer
                  </button>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                <span className="text-gray-600 font-medium text-sm sm:text-base">
                  Popular:
                </span>
                {popularSearches.slice(0, 4).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleTagClick(search)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 text-xs sm:text-sm font-medium"
                  >
                    {search}
                  </button>
                ))}
                <button className="text-primary-600 text-xs sm:text-sm font-medium hover:text-primary-700 transition-colors">
                  +{popularSearches.length - 4} more
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Lawyer Images */}
          <div className="relative lg:h-[600px] hidden lg:block">
            <div className="relative h-full">
              {/* Main lawyer image */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <img
                    src="/hero-advocates.jpeg"
                    alt="Professional Indian Advocates in Courtroom"
                    className="w-64 h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star text-sm"></i>
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        4.9
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating lawyer cards */}
              <div className="absolute top-16 left-8 bg-white rounded-xl p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
                    alt="Lawyer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      Adv. Priya Sharma
                    </div>
                    <div className="text-gray-600 text-xs">
                      Corporate Law Expert
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 right-8 bg-white rounded-xl p-4 shadow-lg max-w-xs">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                    alt="Lawyer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      Adv. Suresh Patel
                    </div>
                    <div className="text-gray-600 text-xs">
                      Property Law Specialist
                    </div>
                  </div>
                </div>
              </div>

              {/* Success indicators */}
              <div className="absolute top-32 right-16 bg-green-100 rounded-full p-3">
                <i className="fas fa-check text-green-600 text-xl"></i>
              </div>

              <div className="absolute bottom-32 left-16 bg-blue-100 rounded-full p-3">
                <i className="fas fa-gavel text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
