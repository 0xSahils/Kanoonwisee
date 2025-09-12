import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const OPCRegistration = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      id: "starter",
      name: "🌱 Starter Plan",
      subtitle: "For New Companies",
      price: "₹1,799",
      originalPrice: "₹3,599",
      discount: "50% OFF",
      timeline: "14-21 days",
      popular: false,
      features: [
        "Expert legal assistance by Kanoonwise team",
        "Company Name Reservation (2–4 days)",
        "Digital Signature Certificate (DSC) – 4–7 days",
        "SPICe+ Form Filing – 14 days",
        "Incorporation Certificate – 14–21 days",
        "Company PAN & TAN",
        "DIN for Directors",
        "6 Months Free Legal Consultation",
      ],
      whatsappMessage:
        "Hi! I'm interested in the Starter Plan for One Person Company Registration (₹1,799). Please help me get started with OPC incorporation.",
    },
    {
      id: "premium",
      name: "🏆 Premium Plan",
      subtitle: "Fast Track + Annual Compliance",
      price: "₹29,999",
      originalPrice: "₹59,999",
      discount: "50% OFF",
      timeline: "7-14 days",
      popular: true,
      features: [
        "Everything in Starter Plan PLUS:",
        "Priority name reservation (1–2 days)",
        "DSC issued in 3–4 days",
        "SPICe+ Form Filing – 5–7 days",
        "Incorporation Certificate – 7–14 days",
        "Appointment of Auditor",
        "Issuance of Share Certificates",
        "INC-20A Form Filing",
        "DIR-3 KYC (for 2 directors)",
        "Accounting & Bookkeeping (up to 100 transactions)",
        "Financial Statement Preparation",
        "Free Accounting Software (1-year license)",
        "AOC-4, MGT-7 & ADT-1 Filing",
        "Annual Filing (Turnover up to ₹20 Lakhs)",
        "Facilitation of Annual General Meeting",
        "PF & ESI Compliance Assistance",
        "One Year Income Tax Filing (Turnover up to ₹20 Lakhs)",
        "30-Minute Consultation with Senior CA/CS for Business Planning",
        "6 Months Free Legal Consultation",
        "Special Discount on Startup Package",
      ],
      whatsappMessage:
        "Hi! I'm interested in the Premium Plan for One Person Company Registration (₹29,999). Please help me get started with complete OPC solution including compliance.",
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
      "Hi! I need consultation about One Person Company Registration. Please help me understand the process and requirements.";
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
                  <i className="fas fa-user text-primary-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-accent-400">
                  👤 Solo Entrepreneur
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  One Person
                  <span className="text-accent-400"> Company</span>
                  <br />
                  <span className="text-accent-500">Registration</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Dreaming of starting your own business, but don't have
                  partners? An OPC is the perfect way to launch your venture
                  with credibility.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">300+</div>
                  <div className="text-sm text-gray-300">OPCs Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">
                    7-12 Days
                  </div>
                  <div className="text-sm text-gray-300">Average Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">100%</div>
                  <div className="text-sm text-gray-300">Ownership</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image Placeholder */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-primary-800/20 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <i className="fas fa-user-tie text-6xl mb-4 text-accent-400"></i>
                    <p className="text-lg font-semibold">One Person Company</p>
                    <p className="text-sm text-gray-300">
                      Solo Entrepreneur Registration
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
                    View OPC Plans
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
              🏢 Kanoonwise Company Registration Plans
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your One Person Company registration
              with transparent pricing
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
                    <ul className="space-y-3 max-h-64 overflow-y-auto">
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

      {/* Benefits of OPC */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Benefits of an OPC
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Starting as an OPC gives you the best of both worlds—the
              independence of a sole proprietorship with the credibility of a
              company
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-crown text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                100% Ownership
              </h3>
              <p className="text-gray-600">
                You remain the sole shareholder and director
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Limited Liability
              </h3>
              <p className="text-gray-600">Your personal assets stay safe</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Better Credibility
              </h3>
              <p className="text-gray-600">
                Banks, investors, and clients prefer registered companies
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-exchange-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Smooth Transition
              </h3>
              <p className="text-gray-600">
                Easily convert OPC into a Private Limited Company later
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About OPC */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary-900 mb-6">
                One Person Company (OPC) Registration in India
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Dreaming of starting your own business, but don't have
                  partners? An OPC (One Person Company) is the perfect way to
                  launch your venture with the credibility of a company—while
                  keeping full control in your hands.
                </p>
                <p>
                  At Kanoonwise.com, we make OPC registration simple, fast, and
                  stress-free with complete guidance from start to finish.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                Why register an OPC with Kanoonwise.com?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    Complete guidance from start to finish—from DSC to
                    incorporation
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    Quick approval of company name and incorporation certificate
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>Affordable packages with no hidden costs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    Ongoing compliance support so you can stay focused on your
                    business
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
              Our OPC Registration Process
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Average timeline: 7–12 working days
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Apply for DSC
              </h3>
              <p className="text-gray-600 text-sm">
                Apply for your Digital Signature Certificate (DSC)
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Reserve Company Name
              </h3>
              <p className="text-gray-600 text-sm">
                Reserve your company name with the MCA
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                File Documents
              </h3>
              <p className="text-gray-600 text-sm">
                File incorporation documents (MoA, AoA, nominee details)
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
                Get your Certificate of Incorporation
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">5</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Post-Registration
              </h3>
              <p className="text-gray-600 text-sm">
                Assistance with post-incorporation compliance (PAN, TAN, GST if
                needed)
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
                Documents you'll need
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-id-card text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">PAN Card</h4>
                    <p className="text-gray-600 text-sm">
                      PAN card of the director
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-id-badge text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">
                      Identity Proof
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Aadhaar / Passport / Voter ID for identity proof
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
                      Latest utility bill or rental agreement for office address
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-camera text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">
                      Photograph
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Passport-sized photo
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-user-friends text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">
                      Nominee Details
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Nominee details (mandatory for OPC setup)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                Post-registration compliance for OPC
              </h3>
              <p className="text-gray-600 mb-6">
                An OPC is easier to manage than a Pvt Ltd, but you still need to
                take care of:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Annual filing of forms with MCA
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Maintaining statutory registers and records
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Filing income tax returns
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    GST compliance (if applicable)
                  </span>
                </li>
              </ul>

              <div className="mt-8">
                <p className="text-sm text-gray-600 mb-4">
                  We provide end-to-end compliance assistance so you won't miss
                  deadlines.
                </p>
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

      {/* Who Should Choose OPC */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Who should choose OPC?
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gray-50 p-6 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-laptop-code text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Freelancers & Consultants
              </h3>
              <p className="text-gray-600 text-sm">
                Who want legal recognition for their work
              </p>
            </div>

            <div className="text-center bg-gray-50 p-6 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-rocket text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Entrepreneurs
              </h3>
              <p className="text-gray-600 text-sm">
                Starting small but planning to scale
              </p>
            </div>

            <div className="text-center bg-gray-50 p-6 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-store text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Sole Proprietors
              </h3>
              <p className="text-gray-600 text-sm">
                Who want liability protection and better credibility
              </p>
            </div>

            <div className="text-center bg-gray-50 p-6 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-seedling text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                First-time Founders
              </h3>
              <p className="text-gray-600 text-sm">
                Who want to test the waters without partners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Can I have more than one shareholder in an OPC?
              </h3>
              <p className="text-gray-700">
                No. OPC can only have one shareholder, but you must appoint a
                nominee.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Is there a minimum capital requirement?
              </h3>
              <p className="text-gray-700">
                No. You can register an OPC with any capital amount.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Can I convert OPC into Pvt Ltd later?
              </h3>
              <p className="text-gray-700">
                Yes. Once you expand, conversion into a Private Limited Company
                is possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to start your OPC?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Take the first step towards your entrepreneurial journey. At
            Kanoonwise.com, we'll handle the paperwork while you focus on
            building your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleGetStarted(plans[0])}
              className="bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Register Your OPC Today
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

export default OPCRegistration;
