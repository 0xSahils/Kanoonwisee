import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const TrademarkIP = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "trademark-basic",
      name: "Trademark Registration",
      subtitle: "Basic",
      originalPrice: "₹4,999",
      price: "₹2,499",
      discount: "50% off",
      description: "Complete trademark registration with expert assistance.",
      features: [
        "Comprehensive trademark search",
        "Application filing in 1 class",
        "Response to examination report",
        "Publication and opposition handling",
        "Registration certificate",
        "10-year protection",
        "Expert legal assistance throughout",
      ],
      timeline: "6-8 months",
      popular: true,
    },
    {
      id: "trademark-premium",
      name: "Trademark Registration",
      subtitle: "Premium",
      originalPrice: "₹7,999",
      price: "₹3,999",
      discount: "50% off",
      description: "Enhanced trademark protection with additional services.",
      features: [
        "Everything in Basic package",
        "Registration in 2 classes",
        "Logo design consultation",
        "Brand protection strategy",
        "Trademark watch service (1 year)",
        "Priority filing support",
        "Dedicated IP consultant",
      ],
      timeline: "6-8 months",
      popular: false,
    },
    {
      id: "copyright",
      name: "Copyright Registration",
      subtitle: "Complete Protection",
      originalPrice: "₹2,999",
      price: "₹1,499",
      discount: "50% off",
      description: "Protect your creative works with copyright registration.",
      features: [
        "Copyright application filing",
        "Document preparation",
        "Government fee included",
        "Registration certificate",
        "Legal validity proof",
        "Expert consultation",
        "Fast-track processing",
      ],
      timeline: "2-3 months",
      popular: false,
    },
    {
      id: "patent-consultation",
      name: "Patent Consultation",
      subtitle: "Innovation Protection",
      originalPrice: "₹9,999",
      price: "₹4,999",
      discount: "50% off",
      description: "Expert consultation for patent filing and strategy.",
      features: [
        "Patentability assessment",
        "Prior art search",
        "Patent drafting guidance",
        "Filing strategy consultation",
        "Market analysis",
        "IP portfolio review",
        "2-hour expert consultation",
      ],
      timeline: "1-2 weeks",
      popular: false,
    },
  ];

  const handleGetStarted = (service) => {
    setSelectedService(service);
    // Create WhatsApp message
    const message = `Hi! I'm interested in ${service.name} - ${service.subtitle} (${service.price}). Please help me get started with IP protection.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-primary-900 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 border border-yellow-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full">
                  <i className="fas fa-shield-alt text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  🛡️ Protect Your Brand
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Trademark &
                  <span className="text-yellow-400"> IP Protection</span>
                  <br />
                  <span className="text-orange-400">Secure Your Assets</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Protect your intellectual property and brand assets with
                  comprehensive IP services. From trademark registration to
                  patent consultation - secure your innovations.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">500+</div>
                  <div className="text-sm text-gray-300">Trademarks Filed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    6-8 Months
                  </div>
                  <div className="text-sm text-gray-300">Registration Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    10 Years
                  </div>
                  <div className="text-sm text-gray-300">Protection Period</div>
                </div>
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Protect Your Brand Today
                </h3>
                <p className="text-gray-300">
                  Choose the right IP protection service for your business
                </p>
              </div>
              <button
                onClick={() =>
                  document
                    .getElementById("services-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              IP Protection <span className="text-yellow-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right IP protection service for your business needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  service.popular ? "ring-2 ring-yellow-500" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {service.name}
                    </h3>
                    <p className="text-yellow-600 font-semibold mb-3">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="mb-4">
                      <span className="text-gray-500 line-through text-lg">
                        {service.originalPrice}
                      </span>
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        {service.discount}
                      </span>
                    </div>

                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {service.price}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      + Govt Fee (to be paid later)
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg mb-6">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-clock text-blue-600 mr-2"></i>
                        <span className="font-semibold text-blue-800">
                          Timeline: {service.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleGetStarted(service)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-6 ${
                      service.popular
                        ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    Get Started
                  </button>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      What's included
                    </h4>
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <i className="fas fa-check text-green-500 mt-1 flex-shrink-0"></i>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              <strong>Note:</strong> Government fees are additional and vary by
              service type. We'll provide exact amounts before processing.
            </p>
          </div>
        </div>
      </section>

      {/* Why IP Protection Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why <span className="text-yellow-600">IP Protection</span> Matters
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <i className="fas fa-shield-alt text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Brand Protection
              </h3>
              <p className="text-gray-600">
                Protect your brand identity and prevent unauthorized use by
                competitors
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <i className="fas fa-chart-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Business Value
              </h3>
              <p className="text-gray-600">
                Increase your business valuation with protected intellectual
                property assets
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <i className="fas fa-gavel text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Legal Rights
              </h3>
              <p className="text-gray-600">
                Gain exclusive legal rights to use and license your intellectual
                property
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrademarkIP;
