import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const SoleProprietorshipRegistration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = {
    starter: {
      name: "Starter Plan",
      subtitle: "Basic Registration Support",
      price: "₹1,199",
      fee: 1199,
      originalPrice: "₹2,399",
      discount: "50% OFF",
      timeline: "7-10 days",
      features: [
        "Expert assisted process",
        "GST or MSME (Udyam) registration (any one)",
        "PAN + TAN support (if required)",
        "Guidance on bank account opening for proprietorship",
        "6 months free legal consultation for any issue",
        "Special discount on Startup Package",
      ],
    },
    premium: {
      name: "Premium Plan",
      subtitle: "Complete Proprietorship Compliance",
      price: "₹9,912",
      fee: 9912,
      originalPrice: "₹19,824",
      discount: "50% OFF",
      timeline: "7-10 days",
      features: [
        "Everything in Starter Plan PLUS:",
        "GST registration",
        "MSME registration (Udyam)",
        "GST filing for one financial year (up to 500 transactions)",
        "Income Tax Return filing (one year)",
        "Bookkeeping support (up to 100 transactions)",
        "Annual compliance guidance",
        "6 months free legal consultation",
        "Special discount on Startup Package",
      ],
    },
  };

  const processSteps = [
    {
      step: "1",
      title: "Obtain PAN Card",
      description: "Get your PAN card if not already available",
    },
    {
      step: "2",
      title: "Choose Business Name",
      description: "Select your business name for branding purposes",
    },
    {
      step: "3",
      title: "Register Key Licenses",
      description: "GST, MSME/Udyam, Shop & Establishment licenses",
    },
    {
      step: "4",
      title: "Open Current Account",
      description: "Open business current account for clean finances",
    },
  ];

  const documents = [
    "PAN and Aadhaar (or equivalent identity proof)",
    "Proof of business address (rent agreement or utility bill)",
    "NOC from landlord, if applicable",
    "License-specific documents like FSSAI or IEC (if required)",
  ];

  const faqs = [
    {
      question: "Do I need any formal registration to start a proprietorship?",
      answer:
        "Not by law—your business identity exists through licenses and bank accounts.",
    },
    {
      question: "Is MSME or GST mandatory?",
      answer:
        "GST is mandatory beyond turnover thresholds; MSME (Udyam) is voluntary but useful for benefits.",
    },
    {
      question: "Can I convert to another structure later?",
      answer:
        "Yes, you can convert to an LLP or Private Limited company as your business grows.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative my-28 py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content */}
            <div className="text-white order-2 lg:order-1">
              <div className="inline-flex items-center bg-accent-500/20 text-accent-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <i className="fas fa-user-tie mr-2"></i>
                Perfect for Solo Entrepreneurs
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Sole Proprietorship Registration
              </h1>
              <p className="text-lg sm:text-xl lg:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                Starting your business on your own? A Sole Proprietorship may be
                the simplest route—quick setup, fewer formalities, and full
                control at your fingertips.
              </p>

              {/* Key Benefits */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3 text-sm sm:text-base"></i>
                  <span className="text-sm sm:text-base">
                    Easy setup – minimal paperwork
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3 text-sm sm:text-base"></i>
                  <span className="text-sm sm:text-base">
                    Complete business control
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3 text-sm sm:text-base"></i>
                  <span className="text-sm sm:text-base">
                    Transparent pricing
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3 text-sm sm:text-base"></i>
                  <span className="text-sm sm:text-base">
                    Expert legal guidance
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Pricing Cards */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              {Object.entries(plans).map(([key, plan]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-gray-200 transition-all duration-300 hover:border-accent-500 hover:transform hover:scale-[1.02]"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-lg sm:text-xl font-bold text-primary-900">
                        {plan.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {plan.subtitle}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="flex items-center sm:justify-end space-x-2">
                        <span className="text-xl sm:text-2xl font-bold text-primary-900">
                          {plan.price}
                        </span>
                        <div className="text-xs">
                          <div className="text-gray-500 line-through">
                            {plan.originalPrice}
                          </div>
                          <div className="text-green-600 font-semibold">
                            {plan.discount}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">+ Govt. Fees</p>
                    </div>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-accent-600">
                      Timeline: {plan.timeline}
                    </p>
                  </div>

                  <div className="mb-4">
                    <PublicBusinessServicePayment
                      serviceName={`Sole Proprietorship ${plan.name}`}
                      packageData={{
                        id: plan.id,
                        name: `Sole Proprietorship ${plan.name}`,
                        price: plan.price.replace('₹', '').replace(',', ''),
                        description: plan.description,
                        features: plan.features
                      }}
                      buttonText={`Get Started - ${plan.price}`}
                      className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition-colors duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-4">
              Choose Your Plan
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Select the plan that best fits your business needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300 ${
                  key === "premium"
                    ? "border-accent-500 bg-accent-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {key === "premium" && (
                  <div className="text-center mb-4 sm:mb-6">
                    <span className="bg-accent-500 text-primary-900 px-3 sm:px-4 py-1 rounded-full text-xs font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    {plan.subtitle}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-primary-900">
                      {plan.price}
                    </span>
                    <div className="text-left">
                      <div className="text-sm text-gray-500 line-through">
                        {plan.originalPrice}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {plan.discount}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">+ Government Fees</p>
                </div>

                <ul className="space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-3 mt-1 flex-shrink-0 text-sm"></i>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <PublicBusinessServicePayment
                    serviceName={`Sole Proprietorship ${plan.name}`}
                    packageData={{
                      id: plan.id || key,
                      name: `Sole Proprietorship ${plan.name}`,
                      price: plan.price.replace('₹', '').replace(',', ''),
                      description: plan.description,
                      features: plan.features
                    }}
                    buttonText={`Choose ${plan.name} - ${plan.price}`}
                    className={`w-full font-semibold py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition-colors duration-300 ${
                      key === "premium"
                        ? "bg-accent-500 hover:bg-accent-600 text-primary-900"
                        : "bg-primary-900 hover:bg-primary-800 text-white"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Sole Proprietorship */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              What Makes a Sole Proprietorship Special?
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-check text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">
                Full Control
              </h3>
              <p className="text-gray-600">
                No legal distinction between business owner and business—ideal
                for solo entrepreneurs who want simplicity.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-coins text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">
                Keep All Profits
              </h3>
              <p className="text-gray-600">
                You enjoy full business control and keep all profits—but also
                bear all risks.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-dollar-sign text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">
                Low Cost
              </h3>
              <p className="text-gray-600">
                It's inexpensive to start and requires far less ongoing
                compliance than other business forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Simple, Step-by-Step Process
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make the registration process simple and straightforward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent-500 text-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-primary-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-6">
                Documents Required
              </h2>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-start">
                    <i className="fas fa-file-alt text-accent-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-primary-900 mb-4">
                After Registration: Staying Compliant
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-700">
                    File your Income Tax Return annually
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-700">
                    File GST returns (if registered)
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-700">
                    Follow TDS and other tax-related requirements
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-700">
                    Renew licenses like Udyam or Shop & Establishment
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Ready to Launch Your Business?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Keep it clear. Keep it compliant. Keep it yours.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed">
            Let Kanoonwise.com guide you. You bring the dream—we handle the
            details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center max-w-2xl mx-auto">
            <div className="w-full sm:flex-1 sm:max-w-xs">
              <PublicBusinessServicePayment
                serviceName="Sole Proprietorship Starter Plan"
                packageData={{
                  id: "sole-proprietorship-starter",
                  name: "Sole Proprietorship Starter Plan",
                  price: "1199",
                  description: "Basic sole proprietorship registration",
                  features: ["Business registration", "PAN card assistance", "Bank account guidance"]
                }}
                buttonText="Start Registration - ₹1,199"
                className="w-full bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              />
            </div>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi! I want to talk to your experts about Sole Proprietorship Registration. Can you help me understand the process?"
                );
                window.open(
                  `https://wa.me/919876543210?text=${message}`,
                  "_blank"
                );
              }}
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-primary-900 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-colors duration-300 flex items-center justify-center shadow-lg text-base sm:text-lg"
            >
              <i className="fas fa-comments mr-2"></i>
              <span className="hidden sm:inline">Talk to Our Experts</span>
              <span className="sm:hidden">Talk to Experts</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SoleProprietorshipRegistration;
