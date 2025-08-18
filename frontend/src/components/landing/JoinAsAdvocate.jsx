import React from "react";
import { useNavigate } from "react-router-dom";

const JoinAsAdvocate = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate("/join-as-lawyer");
  };

  const benefits = [
    {
      icon: "fas fa-users",
      title: "Expand Your Client Base",
      description:
        "Connect with thousands of potential clients across India looking for legal expertise.",
    },
    {
      icon: "fas fa-chart-line",
      title: "Grow Your Practice",
      description:
        "Increase your revenue with our platform's extensive reach and marketing support.",
    },
    {
      icon: "fas fa-clock",
      title: "Flexible Schedule",
      description:
        "Work on your own terms with flexible consultation hours and case management.",
    },
    {
      icon: "fas fa-shield-check",
      title: "Verified Platform",
      description:
        "Join a trusted platform with verified clients and secure payment processing.",
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Digital Tools",
      description:
        "Access modern tools for case management, client communication, and documentation.",
    },
    {
      icon: "fas fa-handshake",
      title: "Professional Network",
      description:
        "Connect with fellow advocates and build valuable professional relationships.",
    },
  ];

  const stats = [
    { number: "5,000+", label: "Active Advocates" },
    { number: "₹2.5L+", label: "Average Monthly Earnings" },
    { number: "25,000+", label: "Cases Handled" },
    { number: "4.8/5", label: "Advocate Rating" },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-500 rounded-full animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-300 rounded-full animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 rounded-full px-4 py-2 mb-6">
            <i className="fas fa-balance-scale text-orange-600"></i>
            <span className="text-orange-700 font-semibold">
              For Legal Professionals
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Join as an <span className="text-orange-600">Advocate</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Become part of India's premier legal network. Connect with clients,
            grow your practice, and make a meaningful impact in the legal
            profession.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <i className={`${benefit.icon} text-orange-600 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-pattern"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Legal Career?
            </h3>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful advocates who have expanded their
              practice with Kanoonwise. Start your journey today!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleJoinNow}
                className="group bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg"
              >
                <i className="fas fa-balance-scale mr-3 group-hover:scale-110 transition-transform duration-300"></i>
                Join as Advocate
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>

              <div className="flex items-center space-x-4 text-orange-100">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-300"></i>
                  <span>Free Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-green-300"></i>
                  <span>No Hidden Fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-12">
            How to Get Started
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Register & Verify
              </h4>
              <p className="text-gray-600">
                Complete your registration with professional credentials and get
                verified by our team.
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-orange-200 transform -translate-x-1/2"></div>
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Set Up Profile
              </h4>
              <p className="text-gray-600">
                Create your professional profile, set your rates, and define
                your areas of expertise.
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-orange-200 transform -translate-x-1/2"></div>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Start Practicing
              </h4>
              <p className="text-gray-600">
                Begin receiving client requests and start growing your practice
                with our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsAdvocate;
