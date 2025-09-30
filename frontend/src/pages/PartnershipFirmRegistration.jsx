import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const PartnershipFirmRegistration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = {
    starter: {
      name: "Starter Plan",
      subtitle: "Basic Partnership Registration",
      price: "₹2,999",
      fee: 2999,
      originalPrice: "₹5,999",
      discount: "50% OFF",
      timeline: "7-10 days",
      features: [
        "Expert assisted process",
        "Drafting of Partnership Deed within 3 days",
        "Submission of deed to local registrar on your behalf",
        "PAN card for the firm",
        "Guidance on opening current account",
        "6 months free legal consultation for any issue",
        "Special discount on Startup Package",
      ],
    },
    premium: {
      name: "Premium Plan",
      subtitle: "Registration + GST + Compliance",
      price: "₹5,999",
      fee: 5999,
      originalPrice: "₹11,999",
      discount: "50% OFF",
      timeline: "7-10 days",
      features: [
        "Everything in Starter Plan PLUS:",
        "GST registration",
        "GSTR-1 & GSTR-3B filing for 12 months (up to 300 transactions)",
        "Accounting software (1-year license)",
        "Compliance checklist for smooth operations",
        "6 months free legal consultation",
        "Special discount on Startup Package",
      ],
    },
  };

  const benefits = [
    {
      icon: "fas fa-rocket",
      title: "Simple to Set Up",
      description: "Registration is quick and hassle-free",
    },
    {
      icon: "fas fa-users",
      title: "Shared Responsibilities",
      description: "Partners can divide roles, skills, and workload",
    },
    {
      icon: "fas fa-clipboard-check",
      title: "Low Compliance Burden",
      description: "Compared to companies and LLPs",
    },
    {
      icon: "fas fa-certificate",
      title: "Better Credibility",
      description: "Than informal or unregistered partnerships",
    },
    {
      icon: "fas fa-handshake",
      title: "Flexibility in Decision-Making",
      description: "Governed by mutual consent of partners",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Select Business Name",
      description: "Choose a unique business name for your partnership",
    },
    {
      step: "2",
      title: "Draft Partnership Deed",
      description:
        "Detail partners' rights, duties, profit-sharing ratio, and terms",
    },
    {
      step: "3",
      title: "Notarize the Deed",
      description: "Get the Partnership Deed notarized",
    },
    {
      step: "4",
      title: "Apply for PAN",
      description: "Apply for PAN and open current account in firm's name",
    },
    {
      step: "5",
      title: "Register with Registrar",
      description: "Register the firm with the Registrar of Firms",
    },
    {
      step: "6",
      title: "Additional Licenses",
      description: "Apply for GST, MSME, or other licenses if needed",
    },
  ];

  const documents = [
    "PAN cards of all partners",
    "Aadhaar / Voter ID / Passport / Driving License of all partners",
    "Passport-size photos of partners",
    "Partnership Deed (drafted and signed by all partners)",
    "Proof of business address (utility bill or rent agreement + NOC from landlord)",
  ];

  const faqs = [
    {
      question: "Is it mandatory to register a partnership firm?",
      answer:
        "No, but registration is strongly recommended for legal protection and to enforce rights in court.",
    },
    {
      question: "What is the minimum number of partners required?",
      answer: "At least 2 partners are required; maximum limit is 50 partners.",
    },
    {
      question:
        "Can a partnership firm be converted into another structure later?",
      answer:
        "Yes. It can be converted into an LLP or Private Limited Company as the business expands.",
    },
    {
      question: "Is a written Partnership Deed compulsory?",
      answer:
        "Yes. It defines the rights, duties, and responsibilities of each partner and avoids disputes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center bg-accent-500/20 text-accent-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i className="fas fa-handshake mr-2"></i>
                Perfect for Business Partners
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Partnership Firm Registration
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                If you're planning to start a business with two or more people,
                registering a Partnership Firm is one of the most traditional
                and trusted options in India.
              </p>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3"></i>
                  <span>End-to-end guidance</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3"></i>
                  <span>Customized Partnership Deed</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3"></i>
                  <span>Affordable packages</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3"></i>
                  <span>Post-registration support</span>
                </div>
              </div>
            </div>

            {/* Right Content - Pricing Cards */}
            <div className="space-y-6">
              {Object.entries(plans).map(([key, plan]) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200 transition-all duration-300 hover:border-accent-500 hover:transform hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary-900">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-600">{plan.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary-900">
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

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-accent-600">
                      Timeline: {plan.timeline}
                    </p>
                  </div>

                  <PublicBusinessServicePayment 
                    serviceName="Partnership Firm Registration"
                    buttonText={`Pay ${plan.price}`}
                    className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Choose Your Plan
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the plan that best fits your partnership needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 ${
                  key === "premium"
                    ? "border-accent-500 bg-accent-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                {key === "premium" && (
                  <div className="text-center mb-6">
                    <span className="bg-accent-500 text-primary-900 px-4 py-1 rounded-full text-xs font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-primary-900">
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

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-3 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <PublicBusinessServicePayment 
                  serviceName="Partnership Firm Registration"
                  buttonText={`Pay ${plan.price}`}
                  className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center ${
                    key === "premium"
                      ? "bg-accent-500 hover:bg-accent-600 text-primary-900"
                      : "bg-primary-900 hover:bg-primary-800 text-white"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Benefits of a Partnership Firm
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why Partnership Firms are ideal for collaborative
              business ventures
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white hover:bg-accent-50 transition-colors duration-300 shadow-lg"
              >
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${benefit.icon} text-accent-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Partnership Firm Registration Process
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures smooth registration and legal
              compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Documents and Compliance */}
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
                Post-Registration Compliance
              </h3>
              <p className="text-gray-600 mb-4">
                Partnership firms are simpler to manage, but compliance is still
                important:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-700">
                    File income tax returns annually for the firm
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-700">
                    Deduct and deposit TDS if applicable
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-700">
                    Renew licenses and registrations as required
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                  <span className="text-gray-700">
                    Maintain proper books of accounts and records
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Register */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Who Should Register a Partnership Firm?
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-store text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-3">
                Small Businesses
              </h3>
              <p className="text-gray-600 text-sm">
                Run by two or more individuals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-tie text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-3">
                Professionals
              </h3>
              <p className="text-gray-600 text-sm">
                Service providers working together under one entity
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-home text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-3">
                Family Businesses
              </h3>
              <p className="text-gray-600 text-sm">
                Family-run or community-run businesses
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-3">
                Entrepreneurs
              </h3>
              <p className="text-gray-600 text-sm">
                Who prefer low compliance and flexible management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
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
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Register Your Partnership Firm?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Lay a strong foundation for your business with a legally recognized
            partnership.
          </p>
          <p className="text-lg text-blue-200 mb-8">
            At Kanoonwise.com, we'll take care of the paperwork so you and your
            partners can focus on growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PublicBusinessServicePayment 
              serviceName="Partnership Firm Registration"
              buttonText={`Pay ${plans.starter.price}`}
              className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
            />
            <PublicBusinessServicePayment 
              serviceName="Partnership Firm Registration"
              buttonText={`Pay ${plans.premium.price}`}
              className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnershipFirmRegistration;
