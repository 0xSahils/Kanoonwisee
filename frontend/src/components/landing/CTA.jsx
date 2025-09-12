import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  // Button click handlers
  const handleFindLawyer = () => {
    navigate("/login");
  };

  const handleExploreServices = () => {
    navigate("/login");
  };

  const handleCallNow = () => {
    window.open("tel:+919876543210", "_self");
  };

  const handleLiveChat = () => {
    // You can replace this with your actual chat widget trigger
    // For example: window.Intercom('show') or similar
    navigate("/contact");
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden border-t border-b">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container-custom relative z-10">
        <div className="text-center text-gray-900">
          {/* Main CTA Content */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <i className="fas fa-rocket text-white"></i>
              <span className="text-white font-semibold">
                Get Started Today
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Get Legal Help?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of satisfied clients who trust Kanoonwise for their
              legal needs. Get connected with expert lawyers in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button
                onClick={handleFindLawyer}
                className="group bg-primary-700 hover:bg-primary-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                <i className="fas fa-search mr-3 group-hover:scale-110 transition-transform duration-300"></i>
                Find a Lawyer
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
              <button
                onClick={handleExploreServices}
                className="group bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                <i className="fas fa-briefcase mr-3 group-hover:scale-110 transition-transform duration-300"></i>
                Explore Services
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 border">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-lg mb-4">
                <i className="fas fa-clock text-primary-700 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Get connected with lawyers within 30 minutes
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-lg mb-4">
                <i className="fas fa-shield-check text-primary-700 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-gray-600">
                Your information is completely safe and confidential
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-lg mb-4">
                <i className="fas fa-award text-primary-700 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Lawyers</h3>
              <p className="text-gray-600">
                Only verified and experienced legal professionals
              </p>
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              Need Immediate Assistance?
            </h3>
            <p className="text-primary-100 mb-8 text-lg">
              Our legal experts are available 24/7 to help you with urgent
              matters
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={handleCallNow}
                className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Call Now</div>
                    <div className="text-primary-100">+91 9876543210</div>
                  </div>
                </div>
              </button>

              <button
                onClick={handleLiveChat}
                className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                    <i className="fas fa-comments text-white"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Live Chat</div>
                    <div className="text-primary-100">Available 24/7</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-accent-500"></i>
                <span>15,000+ Verified Lawyers</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-accent-500"></i>
                <span>50,000+ Cases Resolved</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-accent-500"></i>
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-accent-500"></i>
                <span>24/7 Support</span>
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

export default CTA;
