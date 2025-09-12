import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  // Service handlers
  const handleServiceClick = (service) => {
    const servicePath = service.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/services/${servicePath}`);
  };

  const handleConsultExpert = () => {
    navigate("/consult-expert");
  };

  const handleScheduleCall = () => {
    navigate("/schedule-call");
  };

  const services = [
    {
      icon: "fas fa-gavel",
      title: "Criminal Law",
      description:
        "Expert criminal defense representation in Indian courts from bail to trial",
      features: ["Bail Applications", "Criminal Defense", "FIR Consultation"],
      price: "₹2,999",
      popular: true,
      gradient: "",
    },
    {
      icon: "fas fa-home",
      title: "Family & Matrimonial",
      description:
        "Comprehensive family law services including divorce, custody, and property",
      features: ["Divorce Proceedings", "Child Custody", "Maintenance Cases"],
      price: "₹1,999",
      popular: false,
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: "fas fa-building",
      title: "Corporate & Business",
      description:
        "Complete business legal solutions from incorporation to compliance",
      features: [
        "Company Registration",
        "GST & Tax Compliance",
        "Contract Drafting",
      ],
      price: "₹1,499",
      popular: false,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: "fas fa-landmark",
      title: "Property & Real Estate",
      description:
        "Property disputes, documentation, and real estate legal matters",
      features: [
        "Property Verification",
        "Title Disputes",
        "Registration Services",
      ],
      price: "₹2,499",
      popular: false,
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: "fas fa-balance-scale",
      title: "Civil Litigation",
      description:
        "Civil court representation for disputes, recovery, and legal matters",
      features: ["Civil Suits", "Money Recovery", "Contract Disputes"],
      price: "₹3,499",
      popular: false,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Consumer Protection",
      description:
        "Consumer court cases, product liability, and service deficiency matters",
      features: [
        "Consumer Complaints",
        "Product Liability",
        "Service Deficiency",
      ],
      price: "₹2,999",
      popular: false,
      gradient: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2 mb-4">
            <i className="fas fa-balance-scale text-primary-900"></i>
            <span className="text-primary-900 font-semibold">
              🇮🇳 Legal Expertise
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Expert Legal Services Across India
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Connect with specialized advocates for all your legal needs - from
            Supreme Court to District Courts. Professional legal consultation
            with transparent pricing across all major Indian cities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group animate-scale-in ${
                service.popular ? "ring-2 ring-primary-500" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-primary-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Service Icon */}
              <div className="p-8 pb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-900 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={`${service.icon} text-white text-2xl`}></i>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                        <i className="fas fa-check text-green-600 text-xs"></i>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      {service.price}
                    </span>
                    <span className="text-gray-600 ml-1">onwards</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleServiceClick(service)}
                  className={`w-full py-4 px-6 bg-primary-900 hover:bg-primary-800 text-white font-semibold rounded-xl transition-colors duration-200`}
                >
                  Get Started
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>

              {/* Hover Effect Background */}
              <div
                className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Legal Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Our expert legal team can create tailored solutions for your
              unique requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleConsultExpert} className="btn-primary">
                <i className="fas fa-phone mr-2"></i>
                Consult an Expert
              </button>
              <button onClick={handleScheduleCall} className="btn-secondary">
                <i className="fas fa-calendar mr-2"></i>
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
