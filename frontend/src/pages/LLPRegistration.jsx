import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const LLPRegistration = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      id: "starter",
      name: "⚖️ Starter Plan",
      subtitle: "For New LLPs",
      price: "₹1,799",
      originalPrice: "₹3,599",
      discount: "50% OFF",
      timeline: "21 days",
      popular: false,
      features: [
        "Expert legal assistance by Kanoonwise team",
        "LLP Name Reservation (2–4 days)",
        "Digital Signature Certificate (DSC) – 4–7 days",
        "LLP Incorporation Form Filing – 21 days",
        "LLP Incorporation Certificate",
        "LLP Agreement Filing – 14 days (post-incorporation)",
        "PAN & TAN for LLP",
        "DIN for Designated Partners",
        "6 Months Free Legal Consultation",
      ],
      whatsappMessage:
        "Hi! I'm interested in the Starter Plan for LLP Registration (₹1,799). Please help me get started with LLP incorporation.",
    },
    {
      id: "premium",
      name: "💎 Premium Plan",
      subtitle: "LLP + Annual Compliance",
      price: "₹12,999",
      originalPrice: "₹25,999",
      discount: "50% OFF",
      timeline: "14 days",
      popular: true,
      features: [
        "Everything in Starter Plan PLUS:",
        "Priority LLP Name Reservation – within 24 hours",
        "DSC issued in 24 hours",
        "LLP Incorporation Form Filing – 14 days",
        "LLP Agreement Filing – 7 days (post-incorporation)",
        "Digital Welcome Kit (compliance checklist)",
        "30-minute call with Senior CA/CS for business planning",
        "Form 8 & Form 11 Filing (Annual Returns) – 1 Year",
        "DIR-3 KYC (for 2 partners)",
        "One Year Income Tax Filing (Turnover up to ₹20 Lakhs)",
        "Accounting & Bookkeeping (up to 100 transactions)",
        "Preparation of Financial Statements",
        "Free Accounting Software (1-year license)",
        "6 Months Free Legal Consultation",
        "Special Discount on Startup Package",
      ],
      whatsappMessage:
        "Hi! I'm interested in the Premium Plan for LLP Registration (₹12,999). Please help me get started with complete LLP solution including compliance.",
    },
  ];

  const handleGetStarted = (plan) => {
    setSelectedPlan(plan);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      plan.whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleConsultation = () => {
    const message =
      "Hi! I need consultation about LLP Registration. Please help me understand the process and requirements.";
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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-accent-500/20 rounded-full px-4 py-2 border border-accent-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-accent-500 rounded-full">
                  <i className="fas fa-handshake text-primary-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-accent-400">
                  🤝 Partnership Registration
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Limited Liability
                  <span className="text-accent-400"> Partnership</span>
                  <br />
                  <span className="text-accent-500">Registration</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Turning your business idea into reality just became easier.
                  Simplify setting up an LLP so you can focus on building your
                  dream.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">500+</div>
                  <div className="text-sm text-gray-300">LLPs Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">
                    14 Days
                  </div>
                  <div className="text-sm text-gray-300">Average Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">
                    Low Cost
                  </div>
                  <div className="text-sm text-gray-300">
                    Setup & Compliance
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image Placeholder */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-primary-800/20 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <i className="fas fa-handshake text-6xl mb-4 text-accent-400"></i>
                    <p className="text-lg font-semibold">
                      Limited Liability Partnership
                    </p>
                    <p className="text-sm text-gray-300">
                      Professional Registration
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={() =>
                      document
                        .getElementById("pricing-section")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className="w-full bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    View LLP Plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-4 bg-accent-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-primary-900 font-semibold text-lg">
              📢 IMPORTANT: Government fees are paid separately after
              incorporation
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              ⚖️ Kanoonwise LLP Registration Plans
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your Limited Liability Partnership
              registration with transparent pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                  plan.popular
                    ? "border-accent-500 transform scale-105"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-accent-500 text-primary-900 px-6 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{plan.subtitle}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-primary-900">
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
                      <p className="text-sm text-gray-500 mt-2">
                        + Govt. Fee (Paid Later)
                      </p>
                      <p className="text-sm font-semibold text-accent-600">
                        Timeline: {plan.timeline}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-primary-900">
                      What's Included:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <i className="fas fa-check text-green-500 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleGetStarted(plan)}
                    className={`w-full font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? "bg-accent-500 hover:bg-accent-400 text-primary-900"
                        : "bg-primary-900 hover:bg-primary-800 text-white"
                    }`}
                  >
                    Get Started - {plan.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of LLP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Benefits of setting up an LLP
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Opting for an LLP can truly make sense—especially for small teams
              and startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-dollar-sign text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Low Setup Cost
              </h3>
              <p className="text-gray-600">
                Low setup and compliance cost compared to private limited
                companies
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Limited Liability
              </h3>
              <p className="text-gray-600">
                Flexible management structure with limited liability protection
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-file-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Less Paperwork
              </h3>
              <p className="text-gray-600">
                Less paperwork, lower auditor burden than private companies
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-calculator text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Tax Efficient
              </h3>
              <p className="text-gray-600">
                Audits required only if turnover exceeds ₹40 lakh or capital
                crosses ₹25 lakh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About LLP */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary-900 mb-6">
                Limited Liability Partnership (LLP) Registration in India
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Turning your business idea into reality just became easier. At
                  Kanoonwise.com, we simplify setting up an LLP so you can focus
                  on building your dream—without getting tangled in legal
                  complexities.
                </p>
                <p>
                  We check and secure your LLP name quickly, take care of DSC,
                  LLP agreement drafting, and the incorporation process—so you
                  don't have to navigate MCA forms on your own.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                Why choose Kanoonwise.com for LLP registration?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    We check and secure your LLP name quickly (usually within a
                    day or two)
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    Complete DSC, LLP agreement drafting, and incorporation
                    process
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    Expect your LLP to be registered within about 14 business
                    days
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    Post-incorporation compliance assistance (annual filings,
                    bookkeeping, tax coordination)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              How our process works
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simplified and human-friendly LLP registration process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Get Digital Signatures
              </h3>
              <p className="text-gray-600 text-sm">
                Get Digital Signatures (DSC) for all partners
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Reserve LLP Name
              </h3>
              <p className="text-gray-600 text-sm">
                Reserve your LLP name with the MCA
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Draft LLP Agreement
              </h3>
              <p className="text-gray-600 text-sm">
                Draft, sign, and file the LLP Agreement
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Get Certificate
              </h3>
              <p className="text-gray-600 text-sm">
                Receive your official LLP incorporation certificate (usually in
                14 days)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-primary-900 mb-6">
                Documents you'll typically need
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-id-card text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">
                      Identity Proof
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Aadhaar, Passport, or Voter ID of partners
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-home text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">
                      Address Proof
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Recent utility bill or rent agreement
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-camera text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">
                      Photographs
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Passport-sized photos of all partners
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-file-contract text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">
                      NOC from Landlord
                    </h4>
                    <p className="text-gray-600 text-sm">
                      If registered address is rented (on stamp paper)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                What happens after LLP is registered?
              </h3>
              <p className="text-gray-600 mb-6">
                LLPs are simple, but they still need attention after setup.
                Here's what we'll assist you with:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Filing annual returns (Form 11) and statements of accounts
                    (Form 8) every year
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Income tax filings and bookkeeping
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Optional registrations (like MSME or GST) if you later
                    decide to scale
                  </span>
                </li>
              </ul>

              <div className="mt-8">
                <button
                  onClick={handleConsultation}
                  className="w-full bg-primary-900 hover:bg-primary-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Get Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Do I need more than one partner to register an LLP?
              </h3>
              <p className="text-gray-700">
                Yes—LLP requires at least two partners. One must also be an
                Indian resident citizen.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Is LLP tax-efficient compared to Pvt Ltd?
              </h3>
              <p className="text-gray-700">
                Yes—LLPs avoid taxes like MAT, DDT, and dividend tax, which Pvt
                Ltds often face.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                When is an audit required?
              </h3>
              <p className="text-gray-700">
                Only when turnover crosses ₹40 lakh or capital is over ₹25 lakh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Why entrepreneurs like you choose us
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not a generic service portal. We're your legal partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-user-tie text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Personalized Guidance
              </h3>
              <p className="text-gray-600 text-sm">
                Not just automated forms—real personalized assistance
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-tag text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Clear Pricing
              </h3>
              <p className="text-gray-600 text-sm">
                Clear, honest pricing with no surprise charges
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-headset text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Ongoing Support
              </h3>
              <p className="text-gray-600 text-sm">
                Helpful even after registration—particularly around compliance
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Trusted by Many
              </h3>
              <p className="text-gray-600 text-sm">
                Trusted by professionals and startups alike
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to register your LLP?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Set up your LLP the smart way—smoothly, affordably, and without the
            stress. You bring the idea—we'll handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleGetStarted(plans[0])}
              className="bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started - ₹1,799
            </button>
            <button
              onClick={handleConsultation}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
            >
              Talk to Our Experts
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LLPRegistration;
