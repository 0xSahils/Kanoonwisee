import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
const BusinessServices = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const services = [
    {
      id: "private-limited",
      title: "Private Limited Company",
      description:
        "Fast, affordable & online Private Limited Company registration in India with expert legal guidance",
      features: [
        "Company Name Filing",
        "Digital Signature Certificate",
        "SPICe+ Form Filing",
        "Incorporation Certificate",
        "PAN & TAN",
        "6 Months Free Legal Consultation",
      ],
      price: "Starting from ₹1,199",
      originalPrice: "₹2,399",
      discount: "50% OFF",
      icon: "fas fa-building",
      path: "/private-limited-registration",
      timeline: "28-35 days",
      popular: true,
      category: "Company Registration",
    },
    {
      id: "llp-registration",
      title: "Limited Liability Partnership",
      description:
        "Simple and affordable LLP registration with flexible management structure and limited liability protection",
      features: [
        "LLP Name Reservation",
        "Digital Signature Certificate",
        "LLP Incorporation Form Filing",
        "LLP Agreement Filing",
        "PAN & TAN for LLP",
        "6 Months Free Legal Consultation",
      ],
      price: "Starting from ₹1,799",
      originalPrice: "₹3,599",
      discount: "50% OFF",
      icon: "fas fa-handshake",
      path: "/llp-registration",
      timeline: "21 days",
      popular: false,
      category: "Partnership Registration",
    },
    {
      id: "opc-registration",
      title: "One Person Company",
      description:
        "Perfect for solo entrepreneurs - get company credibility with 100% ownership and limited liability protection",
      features: [
        "Company Name Reservation",
        "Digital Signature Certificate",
        "SPICe+ Form Filing",
        "Incorporation Certificate",
        "Nominee Appointment",
        "6 Months Free Legal Consultation",
      ],
      price: "Starting from ₹1,799",
      originalPrice: "₹3,599",
      discount: "50% OFF",
      icon: "fas fa-user-tie",
      path: "/opc-registration",
      timeline: "14-21 days",
      popular: false,
      category: "Company Registration",
    },
    {
      id: "sole-proprietorship",
      title: "Sole Proprietorship",
      description:
        "Starting your business on your own? The simplest route—quick setup, fewer formalities, and full control at your fingertips",
      features: [
        "Expert assisted process",
        "GST or MSME registration",
        "PAN + TAN support",
        "Bank account guidance",
        "6 months free legal consultation",
        "Special discount on Startup Package",
      ],
      price: "Starting from ₹1,199",
      originalPrice: "₹2,399",
      discount: "50% OFF",
      icon: "fas fa-user-circle",
      path: "/sole-proprietorship-registration",
      timeline: "7-10 days",
      popular: false,
      category: "Individual Registration",
    },
    {
      id: "partnership-firm",
      title: "Partnership Firm",
      description:
        "Traditional and trusted option for two or more people starting a business together with shared responsibilities",
      features: [
        "Partnership Deed drafting",
        "Registrar submission",
        "PAN card for firm",
        "Current account guidance",
        "6 months free legal consultation",
        "Special discount on Startup Package",
      ],
      price: "Starting from ₹2,999",
      originalPrice: "₹5,999",
      discount: "50% OFF",
      icon: "fas fa-users",
      path: "/partnership-firm-registration",
      timeline: "7-10 days",
      popular: false,
      category: "Partnership Registration",
    },
    {
      id: "nidhi-company",
      title: "Nidhi Company",
      description:
        "Encourage savings and provide loans within a close-knit community. Recognized under Section 406 of the Companies Act, 2013",
      features: [
        "Expert compliance guidance",
        "End-to-end assistance",
        "MCA filings support",
        "Post-registration compliance",
        "Community finance structure",
        "Legal recognition under Companies Act",
      ],
      price: "Consultation Required",
      originalPrice: null,
      discount: null,
      icon: "fas fa-university",
      path: "/nidhi-company-registration",
      timeline: "15-20 days",
      popular: false,
      category: "Specialized Registration",
    },
  ];
  const handleServiceClick = (servicePath) => {
    navigate(servicePath);
  };
  const handleConsultation = () => {
    navigate("/search-lawyers?specialization=Business%20%26%20Startup%20Law");
  };
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      {/* Hero Section */}
      <section className="relative navbar-spacing-simple pb-16 bg-primary-900 text-white overflow-hidden">
        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 mb-6">
                <i className="fas fa-briefcase text-yellow-400"></i>
                <span className="text-yellow-400 font-semibold">
                  Business Services
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Complete Business
                <span className="text-yellow-400"> Solutions</span>
                <br />
                <span className="text-orange-400">Expert Guidance</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive business services for startups and established
                companies. From business setup to compliance management - get
                expert assistance with transparent pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleConsultation}
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Get Consultation
                </button>
                <button className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition-all">
                  <i className="fas fa-download mr-2"></i>
                  Service Brochure
                </button>
              </div>
            </div>
            {/* Right Content */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 border border-yellow-500/30">
                <img
                  src="/business-services-hero.jpg"
                  alt="Business Professionals Working"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">
                    Professional Business Services
                  </p>
                  <p className="text-sm opacity-90">
                    Expert solutions for all business needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Company Registration Services
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect business structure for your venture with
              transparent pricing, expert legal guidance, and comprehensive
              support
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.path)}
                className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group border-2 ${
                  service.popular
                    ? "border-accent-500 transform scale-105"
                    : "border-gray-200"
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-accent-500 text-primary-900 px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="h-40 bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center relative">
                  <div className="absolute top-2 right-2">
                    <span className="bg-accent-500/20 text-accent-300 px-2 py-1 rounded text-xs">
                      {service.category}
                    </span>
                  </div>
                  <div className="text-center text-accent-400">
                    <i className={`${service.icon} text-4xl mb-2`}></i>
                    <p className="text-xs text-white opacity-90">
                      {service.timeline}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-xl font-bold text-primary-900">
                        {service.price}
                      </span>
                      {service.originalPrice && (
                        <div className="text-left">
                          <div className="text-xs text-gray-500 line-through">
                            {service.originalPrice}
                          </div>
                          <div className="text-xs font-semibold text-green-600">
                            {service.discount}
                          </div>
                        </div>
                      )}
                    </div>
                    {service.originalPrice && (
                      <p className="text-xs text-gray-500">
                        + Govt. Fee (Paid Later)
                      </p>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-primary-900 mb-2">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="text-xs text-gray-700 flex items-start"
                        >
                          <i className="fas fa-check text-green-500 mr-2 text-xs mt-0.5 flex-shrink-0"></i>
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-xs text-gray-500 italic">
                          + {service.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Expert Legal Guidance
                      </span>
                      <i className="fas fa-arrow-right text-accent-500 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default BusinessServices;
