import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const LegalServices = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "company-registration",
      title: "Company Registration",
      description:
        "Complete business incorporation services with expert legal guidance",
      features: [
        "Private Limited Company",
        "LLP Registration",
        "Partnership Firm",
        "Sole Proprietorship",
      ],
      price: "Starting from ₹2,999",
      icon: "fas fa-building",
      image: "/service-business-registration.jpg",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "legal-documentation",
      title: "Legal Documentation",
      description:
        "Professional drafting of contracts, agreements, and legal documents",
      features: [
        "Contract Drafting",
        "Legal Agreements",
        "Document Review",
        "Legal Notices",
      ],
      price: "Starting from ₹1,499",
      icon: "fas fa-file-contract",
      image: "/service-legal-documentation.webp",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "trademark-registration",
      title: "Trademark Registration",
      description:
        "Protect your brand with comprehensive trademark registration services",
      features: [
        "Trademark Search",
        "Application Filing",
        "Response to Objections",
        "Registration Certificate",
      ],
      price: "Starting from ₹3,999",
      icon: "fas fa-trademark",
      image: "/service-trademark.png",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "gst-services",
      title: "GST Services",
      description:
        "Complete GST compliance and registration services for businesses",
      features: [
        "GST Registration",
        "Return Filing",
        "Compliance Management",
        "GST Consultation",
      ],
      price: "Starting from ₹999",
      icon: "fas fa-calculator",
      image: "/service-gst.jpg",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const handleConsultation = () => {
    navigate("/search-lawyers");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative navbar-spacing-simple pb-16 bg-primary-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0"></div>
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 mb-6">
                <i className="fas fa-briefcase text-yellow-400"></i>
                <span className="text-yellow-400 font-semibold">
                  Legal Services
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Professional Legal
                <span className="text-yellow-400"> Services</span>
                <br />
                <span className="text-orange-400">Expert Solutions</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive legal services for businesses and individuals.
                From company registration to trademark protection - get expert
                legal assistance with transparent pricing.
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

            {/* Right Content - Legal Services Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 border border-yellow-500/30">
                <img
                  src="/legal-services-hero.jpg"
                  alt="Professional Lawyers Working on Legal Documents"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">
                    Professional Legal Services
                  </p>
                  <p className="text-sm opacity-90">
                    Expert solutions for all legal needs
                  </p>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-certificate text-yellow-400 text-2xl"></i>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-handshake text-orange-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Legal Services
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Professional legal services with transparent pricing and expert
              guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-600"
              >
                {/* Service Image */}
                <div className="h-48 bg-gray-700 flex items-center justify-center border-b border-gray-600">
                  <div className="text-center text-yellow-400">
                    <i className={`${service.icon} text-4xl mb-2`}></i>
                    <p className="text-sm opacity-75">{service.image}</p>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-yellow-400 font-bold">
                      {service.price}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">
                      Includes:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-300 flex items-center"
                        >
                          <i className="fas fa-check text-green-400 mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                    <span className="text-sm text-gray-400">
                      Expert Legal Guidance
                    </span>
                    <i className="fas fa-arrow-right text-yellow-400 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Our Legal Services
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                <i className="fas fa-users text-yellow-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Expert Team</h3>
              <p className="text-gray-300">
                Experienced legal professionals with specialized expertise in
                various practice areas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                <i className="fas fa-clock text-orange-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Quick Turnaround
              </h3>
              <p className="text-gray-300">
                Fast and efficient service delivery without compromising on
                quality and accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <i className="fas fa-shield-alt text-green-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Secure & Confidential
              </h3>
              <p className="text-gray-300">
                Complete confidentiality and secure handling of all your legal
                documents and information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LegalServices;
