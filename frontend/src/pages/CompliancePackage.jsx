import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const CompliancePackage = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "day-one",
      name: "Day One Compliance",
      originalPrice: "₹4,999",
      price: "₹2,499",
      discount: "50% off",
      description: "Essential compliance setup for new businesses",
      features: [
        "GST Registration",
        "PF & ESI Registration",
        "Professional Tax Registration",
        "Shop & Establishment License",
        "Compliance Calendar Setup",
        "Monthly Compliance Checklist",
        "Expert Consultation (1 hour)"
      ],
      timeline: "1-2 weeks",
      popular: true,
      businessType: "New Businesses"
    },
    {
      id: "ongoing",
      name: "Ongoing Compliance",
      originalPrice: "₹9,999",
      price: "₹4,999",
      discount: "50% off",
      description: "Monthly compliance management for growing businesses",
      features: [
        "Monthly GST Filing",
        "TDS Return Filing",
        "PF & ESI Compliance",
        "Income Tax Compliance",
        "ROC Annual Filing",
        "Compliance Monitoring",
        "Expert Support (2 hours/month)",
        "Penalty Protection"
      ],
      timeline: "Ongoing Monthly",
      popular: false,
      businessType: "Growing Businesses"
    },
    {
      id: "comprehensive",
      name: "Comprehensive Compliance",
      originalPrice: "₹19,999",
      price: "₹9,999",
      discount: "50% off",
      description: "Complete compliance solution for established businesses",
      features: [
        "Everything in Ongoing Package",
        "Quarterly Compliance Audit",
        "Legal Risk Assessment",
        "Policy Documentation",
        "Employee Handbook Creation",
        "Contract Review Service",
        "Dedicated Compliance Manager",
        "24/7 Compliance Support",
        "Annual Compliance Report"
      ],
      timeline: "Ongoing + Quarterly Reviews",
      popular: false,
      businessType: "Established Businesses"
    }
  ];

  const complianceAreas = [
    {
      icon: "fas fa-file-invoice-dollar",
      title: "Tax Compliance",
      description: "GST, Income Tax, TDS, and other tax-related compliances"
    },
    {
      icon: "fas fa-users",
      title: "Labor Compliance",
      description: "PF, ESI, Professional Tax, and employment law compliance"
    },
    {
      icon: "fas fa-building",
      title: "Corporate Compliance",
      description: "ROC filings, board resolutions, and corporate governance"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Regulatory Compliance",
      description: "Industry-specific licenses and regulatory requirements"
    }
  ];

  const handleGetStarted = (pkg) => {
    setSelectedPackage(pkg);
    // Create WhatsApp message
    const message = `Hi! I'm interested in the ${pkg.name} package (${pkg.price}). Please help me get started with business compliance.`;
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
                  <i className="fas fa-shield-check text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  ✅ Stay Compliant
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Compliance
                  <span className="text-yellow-400"> Package</span>
                  <br />
                  <span className="text-orange-400">Penalty Free</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Day-one compliance solutions to keep your business legally compliant and penalty-free. From startup compliance to ongoing management.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    300+
                  </div>
                  <div className="text-sm text-gray-300">Businesses Compliant</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    Zero
                  </div>
                  <div className="text-sm text-gray-300">Penalties Incurred</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    24/7
                  </div>
                  <div className="text-sm text-gray-300">Support Available</div>
                </div>
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Get Compliant Today</h3>
                <p className="text-gray-300">Choose the compliance solution that fits your business</p>
              </div>
              <button
                onClick={() => document.getElementById('packages-section').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                View Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Choose Your <span className="text-yellow-600">Compliance Solution</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the compliance package that fits your business stage and requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-yellow-500 transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-yellow-600 font-semibold mb-3">{pkg.businessType}</p>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-gray-500 line-through text-lg">{pkg.originalPrice}</span>
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        {pkg.discount}
                      </span>
                    </div>
                    
                    <div className="text-4xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                    <div className="text-sm text-gray-600 mb-4">
                      {pkg.id === 'day-one' ? 'One-time setup' : 'Per month'}
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg mb-6">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-clock text-blue-600 mr-2"></i>
                        <span className="font-semibold text-blue-800">{pkg.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleGetStarted(pkg)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-6 ${
                      pkg.popular
                        ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Get Started
                  </button>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">What's included</h4>
                    {pkg.features.map((feature, featureIndex) => (
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
              <strong>Note:</strong> Government fees and statutory charges are additional. We provide transparent pricing before processing.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Areas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Compliance <span className="text-yellow-600">Areas We Cover</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage across all major compliance requirements for your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceAreas.map((area, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                  <i className={`${area.icon} text-yellow-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Compliance Matters Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why <span className="text-yellow-600">Compliance</span> Matters
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Avoid Penalties</h3>
              <p className="text-gray-600">Non-compliance can result in heavy penalties, interest charges, and legal complications</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <i className="fas fa-chart-line text-green-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Growth</h3>
              <p className="text-gray-600">Proper compliance enables smooth business operations and facilitates growth opportunities</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <i className="fas fa-handshake text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Investor Confidence</h3>
              <p className="text-gray-600">Compliant businesses attract investors and partners with confidence in legal standing</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompliancePackage;
