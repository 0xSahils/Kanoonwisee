import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const TrademarkIP = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "trademark",
      title: "Trademark Registration",
      description:
        "Secure your brand identity with comprehensive trademark protection. From search to registration, we ensure your brand is legally yours.",
      features: [
        "Comprehensive Trademark Search",
        "Application Drafting & Filing",
        "Objection Handling",
        "Status Monitoring",
        "Search Success Guarantee",
      ],
      price: "Starting from ₹7,999",
      icon: "fas fa-certificate",
      path: "/trademark-services",
      color: "yellow",
      timeline: "8-12 months",
      popular: true,
    },
    {
      id: "patent",
      title: "Patent Services",
      description:
        "Transform your invention into a legally protected, high-value asset. Secure your 20-year monopoly with expert patent services.",
      features: [
        "Patentability Search",
        "Provisional & Complete Applications",
        "Examination Response",
        "International Filing (PCT)",
        "Procedural Guarantee",
      ],
      price: "Starting from ₹19,999",
      icon: "fas fa-lightbulb",
      path: "/patent-services",
      color: "blue",
      timeline: "2-4 years",
      popular: false,
    },
    {
      id: "copyright",
      title: "Copyright Registration",
      description:
        "Protect your creative work from code to art. Secure your intellectual property with official copyright registration.",
      features: [
        "Expert Consultation",
        "Application Drafting & Filing",
        "Legal Review",
        "Objection Response",
        "Lifetime Protection",
      ],
      price: "Starting from ₹4,999",
      icon: "fas fa-copyright",
      path: "/copyright-services",
      color: "purple",
      timeline: "3-4 months",
      popular: false,
    },
    {
      id: "design",
      title: "Design Registration",
      description:
        "Protect your product's unique appearance and design. Secure exclusive rights to your visual innovations.",
      features: [
        "Design Search & Analysis",
        "Multi-view Drawings",
        "Application Filing",
        "Objection Handling",
        "15-Year Protection",
      ],
      price: "Starting from ₹9,999",
      icon: "fas fa-palette",
      path: "/design-registration",
      color: "indigo",
      timeline: "6-9 months",
      popular: false,
    },
  ];

  const handleServiceClick = (path) => {
    navigate(path);
  };

  const whyChooseUs = [
    {
      title: "Expert Legal Team",
      description:
        "Our registered Patent Agents and Trademark Attorneys have the dual expertise in law and technology to protect your intellectual property effectively.",
      icon: "fas fa-users",
    },
    {
      title: "Comprehensive Protection",
      description:
        "From trademarks to patents, copyrights to designs, we offer complete IP protection services under one roof.",
      icon: "fas fa-shield-alt",
    },
    {
      title: "Transparent Pricing",
      description:
        "Clear, fixed-fee packages with no hidden costs. Government fees are separate and charged at actuals for complete transparency.",
      icon: "fas fa-dollar-sign",
    },
    {
      title: "Guaranteed Service",
      description:
        "We stand behind our work with ironclad guarantees. Our success is aligned with yours.",
      icon: "fas fa-handshake",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Free Consultation",
      description:
        "Discuss your IP needs with our experts and get a customized protection strategy.",
    },
    {
      step: 2,
      title: "Search & Analysis",
      description:
        "Comprehensive search to assess the viability and potential risks of your IP.",
    },
    {
      step: 3,
      title: "Application Filing",
      description:
        "Expert drafting and filing of your IP application with the relevant government office.",
    },
    {
      step: 4,
      title: "Protection Secured",
      description:
        "Monitor the process and handle any objections until your IP is officially protected.",
    },
  ];

  const stats = [
    { number: "500+", label: "IP Applications Filed" },
    { number: "95%", label: "Success Rate" },
    { number: "₹50L+", label: "Client Savings" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 border border-yellow-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full">
                  <i className="fas fa-trademark text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  🛡️ Intellectual Property Protection
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Protect Your
                  <br />
                  <span className="text-yellow-400">Intellectual Property</span>
                  <br />
                  <span className="text-blue-400">Secure Your Future</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  From trademarks to patents, copyrights to designs - we provide
                  comprehensive IP protection services to safeguard your
                  innovations, brand, and creative works. Your intellectual
                  property is your most valuable asset.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("services-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Explore Our Services
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("why-choose-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  Why Choose Us
                </button>
              </div>
            </div>

            {/* Right Content - IP Types */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Types of IP Protection
                </h3>
                <p className="text-gray-300">
                  Choose the right protection for your assets
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-certificate text-yellow-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">
                    Trademark
                  </div>
                  <div className="text-xs text-gray-300">Brand Protection</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-lightbulb text-blue-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">Patent</div>
                  <div className="text-xs text-gray-300">
                    Invention Protection
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-copyright text-purple-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">
                    Copyright
                  </div>
                  <div className="text-xs text-gray-300">Creative Works</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-palette text-indigo-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">Design</div>
                  <div className="text-xs text-gray-300">Product Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Complete{" "}
              <span className="text-yellow-600">IP Protection Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From trademarks to patents, we provide comprehensive intellectual
              property protection services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.path)}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border-2 ${
                  service.popular
                    ? "border-yellow-500 transform scale-105"
                    : "border-gray-200"
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div
                  className={`h-40 bg-gradient-to-br ${
                    service.color === "yellow"
                      ? "from-yellow-500 to-orange-500"
                      : service.color === "blue"
                      ? "from-blue-500 to-blue-600"
                      : service.color === "purple"
                      ? "from-purple-500 to-purple-600"
                      : "from-indigo-500 to-indigo-600"
                  } flex items-center justify-center relative`}
                >
                  <div className="text-center text-white">
                    <i className={`${service.icon} text-4xl mb-2`}></i>
                    <p className="text-xs text-white opacity-90">
                      {service.timeline}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {service.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      + Government fees (separate)
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {service.features
                      .slice(0, 3)
                      .map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <i className="fas fa-check text-green-500 text-xs"></i>
                          <span className="text-gray-700 text-xs">
                            {feature}
                          </span>
                        </div>
                      ))}
                    {service.features.length > 3 && (
                      <div className="text-xs text-gray-500">
                        + {service.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      service.popular
                        ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Choose <span className="text-yellow-600">Kanoonwise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine legal expertise with technological innovation to
              provide the best IP protection services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                  <i className={`${item.icon} text-yellow-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              How It <span className="text-yellow-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes IP protection simple and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                  <span className="text-xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Protect Your Intellectual Property?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't leave your innovations, brand, or creative works unprotected.
            Get expert IP protection services today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("services-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Services
            </button>
            <button
              onClick={() => {
                const message =
                  "Hi! I'm interested in IP protection services. Please help me understand which services I need for my business.";
                const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
                  message
                )}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrademarkIP;
