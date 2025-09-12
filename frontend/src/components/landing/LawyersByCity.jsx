import React from "react";
import { useNavigate } from "react-router-dom";

const LawyersByCity = () => {
  const navigate = useNavigate();

  // City and specialization handlers
  const handleCityClick = (cityName) => {
    navigate(`/search-lawyers?city=${encodeURIComponent(cityName)}`);
  };

  const handleSpecializationClick = (specName) => {
    navigate(`/search-lawyers?specialization=${encodeURIComponent(specName)}`);
  };

  const handleSearchAllCities = () => {
    navigate("/search-lawyers");
  };

  const handleRequestCity = () => {
    // For now, redirect to search page - can be enhanced later
    navigate("/search-lawyers");
  };

  const cities = [
    {
      name: "Mumbai",
      lawyers: "2,500+",
      icon: "fas fa-building",
      description: "Financial capital with top corporate lawyers",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Delhi",
      lawyers: "3,200+",
      icon: "fas fa-landmark",
      description: "Supreme Court and High Court specialists",
      gradient: "from-red-500 to-red-600",
    },
    {
      name: "Bangalore",
      lawyers: "1,800+",
      icon: "fas fa-city",
      description: "Tech and startup legal experts",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Chennai",
      lawyers: "1,500+",
      icon: "fas fa-building",
      description: "Industrial and maritime law specialists",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      name: "Kolkata",
      lawyers: "1,200+",
      icon: "fas fa-university",
      description: "Traditional law practice with modern approach",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "Hyderabad",
      lawyers: "1,000+",
      icon: "fas fa-building",
      description: "Growing tech hub legal services",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      name: "Pune",
      lawyers: "900+",
      icon: "fas fa-city",
      description: "Education and IT sector legal experts",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Ahmedabad",
      lawyers: "800+",
      icon: "fas fa-building",
      description: "Business and trade law specialists",
      gradient: "from-teal-500 to-teal-600",
    },
  ];

  const specializations = [
    {
      name: "Corporate Law",
      count: "3,500+",
      icon: "fas fa-briefcase",
      color: "blue",
    },
    {
      name: "Family Law",
      count: "2,800+",
      icon: "fas fa-users",
      color: "green",
    },
    {
      name: "Criminal Law",
      count: "2,200+",
      icon: "fas fa-gavel",
      color: "red",
    },
    {
      name: "Property Law",
      count: "1,900+",
      icon: "fas fa-home",
      color: "orange",
    },
    {
      name: "Tax Law",
      count: "1,600+",
      icon: "fas fa-calculator",
      color: "purple",
    },
    {
      name: "IP Law",
      count: "1,200+",
      icon: "fas fa-trademark",
      color: "pink",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-map-marker-alt text-primary-600"></i>
            <span className="text-primary-600 font-semibold">Find Lawyers</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Lawyers Across India
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified lawyers in your city. Our network spans across
            major cities with specialists in every area of law.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {cities.map((city, index) => (
            <div
              key={index}
              onClick={() => handleCityClick(city.name)}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              {/* City Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-900 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <i className={`${city.icon} text-white text-xl`}></i>
              </div>

              {/* City Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                  {city.name}
                </h3>
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  {city.lawyers}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {city.description}
                </p>
              </div>

              {/* CTA */}
              <button className="w-full py-3 px-4 bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-600 font-medium rounded-lg transition-all duration-300 group-hover:bg-primary-50 group-hover:text-primary-600">
                View Lawyers
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>

              {/* Hover Effect */}
              <div
                className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
              ></div>
            </div>
          ))}
        </div>

        {/* Specializations Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Lawyers by Specialization
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our lawyers specialize in various areas of law to provide you with
              expert guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((spec, index) => (
              <div
                key={index}
                onClick={() => handleSpecializationClick(spec.name)}
                className="group bg-gray-50 hover:bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 ${
                      colorClasses[spec.color]
                    } rounded-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <i className={`${spec.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                      {spec.name}
                    </h4>
                    <div className="text-primary-600 font-semibold">
                      {spec.count} Lawyers
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary-700 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Can't Find Your City?
            </h3>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              We're expanding our network daily. Search for lawyers in your area
              or let us know your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSearchAllCities}
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <i className="fas fa-search mr-2"></i>
                Search All Cities
              </button>
              <button
                onClick={handleRequestCity}
                className="bg-primary-700 hover:bg-primary-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <i className="fas fa-plus mr-2"></i>
                Request Your City
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawyersByCity;
