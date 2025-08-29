import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const StartupLegalKit = () => {
  const navigate = useNavigate();
  const [selectedKit, setSelectedKit] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const kits = [
    {
      id: "essential",
      name: "Essential Startup Kit",
      originalPrice: "₹9,999",
      price: "₹4,999",
      discount: "50% off",
      description: "Everything you need to legally launch your startup",
      features: [
        "Company Registration (Pvt Ltd)",
        "Founder Agreement Template",
        "Employment Contract Templates",
        "NDA Templates (2 types)",
        "Privacy Policy & Terms of Service",
        "Basic Compliance Checklist",
        "1 Hour Legal Consultation"
      ],
      timeline: "2-3 weeks",
      popular: true,
      savings: "Save ₹15,000+ vs individual services"
    },
    {
      id: "growth",
      name: "Growth Startup Kit",
      originalPrice: "₹19,999",
      price: "₹9,999",
      discount: "50% off",
      description: "Comprehensive legal foundation for scaling startups",
      features: [
        "Everything in Essential Kit",
        "Shareholder Agreement",
        "ESOP Policy Framework",
        "Vendor/Supplier Agreements",
        "Customer Service Agreements",
        "IP Assignment Agreements",
        "Data Protection Compliance",
        "Quarterly Legal Health Check",
        "3 Hours Legal Consultation"
      ],
      timeline: "3-4 weeks",
      popular: false,
      savings: "Save ₹25,000+ vs individual services"
    },
    {
      id: "fundraising",
      name: "Fundraising Ready Kit",
      originalPrice: "₹39,999",
      price: "₹19,999",
      discount: "50% off",
      description: "Complete legal preparation for investment rounds",
      features: [
        "Everything in Growth Kit",
        "Investment-Ready Cap Table",
        "Due Diligence Checklist",
        "Term Sheet Template",
        "Investor Rights Agreement",
        "Board Resolution Templates",
        "Compliance Audit Report",
        "Fundraising Legal Strategy",
        "5 Hours Legal Consultation",
        "Dedicated Legal Advisor"
      ],
      timeline: "4-6 weeks",
      popular: false,
      savings: "Save ₹50,000+ vs individual services"
    }
  ];

  const handleGetStarted = (kit) => {
    setSelectedKit(kit);
    // Create WhatsApp message
    const message = `Hi! I'm interested in the ${kit.name} (${kit.price}). Please help me get started with my startup legal foundation.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 border border-yellow-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full">
                  <i className="fas fa-box text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  📦 Complete Legal Kit
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  The Startup
                  <span className="text-yellow-400"> Legal Kit</span>
                  <br />
                  <span className="text-orange-400">Launch Ready</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Everything your startup needs for a solid legal foundation - from incorporation to fundraising. Comprehensive legal packages designed for every growth stage.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    200+
                  </div>
                  <div className="text-sm text-gray-300">Startups Launched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    ₹50,000+
                  </div>
                  <div className="text-sm text-gray-300">Average Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    2-6 Weeks
                  </div>
                  <div className="text-sm text-gray-300">Delivery Time</div>
                </div>
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Choose Your Kit</h3>
                <p className="text-gray-300">Select the legal kit that matches your startup stage</p>
              </div>
              <button
                onClick={() => document.getElementById('kits-section').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                View Kits
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Kits Section */}
      <section id="kits-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Choose Your <span className="text-yellow-600">Startup Stage</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the legal kit that matches your startup's current needs and growth stage
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {kits.map((kit, index) => (
              <div
                key={kit.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  kit.popular ? 'ring-2 ring-yellow-500 transform scale-105' : ''
                }`}
              >
                {kit.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{kit.name}</h3>
                    <p className="text-gray-600 mb-4">{kit.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-gray-500 line-through text-lg">{kit.originalPrice}</span>
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        {kit.discount}
                      </span>
                    </div>
                    
                    <div className="text-4xl font-bold text-gray-900 mb-2">{kit.price}</div>
                    <div className="text-sm text-gray-600 mb-4">All-inclusive pricing</div>
                    
                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-piggy-bank text-green-600 mr-2"></i>
                        <span className="font-semibold text-green-800 text-sm">{kit.savings}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg mb-6">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-clock text-blue-600 mr-2"></i>
                        <span className="font-semibold text-blue-800">Delivery: {kit.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleGetStarted(kit)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-6 ${
                      kit.popular
                        ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Get Started
                  </button>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">What's included</h4>
                    {kit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
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
              <strong>All kits include:</strong> Expert legal review, customization for your business, and ongoing support
            </p>
          </div>
        </div>
      </section>

      {/* Why Startups Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Startups <span className="text-yellow-600">Choose Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <i className="fas fa-rocket text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Startup-Focused</h3>
              <p className="text-gray-600">Legal solutions designed specifically for startups and their unique challenges</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <i className="fas fa-dollar-sign text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost-Effective</h3>
              <p className="text-gray-600">Save thousands compared to hiring individual lawyers for each legal need</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <i className="fas fa-users text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Team</h3>
              <p className="text-gray-600">Dedicated legal experts who understand startup ecosystem and investor requirements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              How It <span className="text-yellow-600">Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Kit</h3>
              <p className="text-gray-600">Select the legal kit that matches your startup stage</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Details</h3>
              <p className="text-gray-600">Provide your startup details and specific requirements</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Customization</h3>
              <p className="text-gray-600">Our legal experts customize all documents for your business</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Launch Ready</h3>
              <p className="text-gray-600">Receive your complete legal kit and launch with confidence</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StartupLegalKit;
