import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const PrivateLimitedRegistration = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      id: "starter",
      name: "🌱 Starter Plan",
      subtitle: "Best for First-Time Entrepreneurs",
      price: "₹1,199",
      originalPrice: "₹2,399",
      discount: "50% OFF",
      timeline: "28-35 days",
      popular: false,
      features: [
        "Expert legal assistance by Kanoonwise team",
        "Company name filing (2–4 days)",
        "Digital Signature Certificate (DSC) – 4–7 days",
        "SPICe+ Form Filing – 14 days",
        "Incorporation Certificate (28–35 days)",
        "Company PAN & TAN",
        "DIN for Directors",
        "6 Months Free Legal Consultation",
      ],
      whatsappMessage:
        "Hi! I'm interested in the Starter Plan for Private Limited Company Registration (₹1,199). Please help me get started with company incorporation.",
    },
    {
      id: "pro",
      name: "⚡ Pro Plan",
      subtitle: "Fast Track + Startup Benefits",
      price: "₹3,999",
      originalPrice: "₹7,999",
      discount: "50% OFF",
      timeline: "14-21 days",
      popular: true,
      features: [
        "Everything in Starter Plan PLUS:",
        "Priority company name filing (1–2 days)",
        "Faster DSC processing (3–4 days)",
        "SPICe+ Form Filing in just 7 days",
        "Incorporation Certificate within 14–21 days",
        "Digital Welcome Kit (compliance checklist)",
        "Free MSME Registration 🎉",
        "Trademark Application Filing (Expedited)",
        "Dedicated compliance support",
        "6 Months Free Legal Consultation",
        "Special Discount on Startup Package",
      ],
      whatsappMessage:
        "Hi! I'm interested in the Pro Plan for Private Limited Company Registration (₹3,999). Please help me get started with fast-track incorporation.",
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
      "Hi! I need consultation about Private Limited Company Registration. Please help me understand the process and requirements.";
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
                  <i className="fas fa-building text-primary-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-accent-400">
                  🏢 Company Registration
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Private Limited
                  <span className="text-accent-400"> Company</span>
                  <br />
                  <span className="text-accent-500">Registration</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Fast, affordable & online Private Limited Company registration
                  in India. Complete legal process handled by experts with
                  transparent pricing.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">
                    1000+
                  </div>
                  <div className="text-sm text-gray-300">
                    Companies Registered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">
                    7-10 Days
                  </div>
                  <div className="text-sm text-gray-300">Average Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">100%</div>
                  <div className="text-sm text-gray-300">Lawyer Assisted</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image Placeholder */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-accent-500/20 to-primary-800/20 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <i className="fas fa-building text-6xl mb-4 text-accent-400"></i>
                    <p className="text-lg font-semibold">
                      Private Limited Company
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
                    View Registration Plans
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
              Kanoonwise Company Registration Plans
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your Private Limited Company
              registration with transparent pricing and expert guidance
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

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              🏆 Why Choose Kanoonwise?
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-balance-scale text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                100% Lawyer-Assisted Process ⚖️
              </h3>
              <p className="text-gray-600">
                Every step handled by qualified legal professionals
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-eye text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                No hidden costs - clear pricing structure
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-headset text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                Dedicated Support
              </h3>
              <p className="text-gray-600">
                Support till you're fully incorporated
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <i className="fas fa-comments text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-4">
                6 Months FREE Consultation
              </h3>
              <p className="text-gray-600">
                Ongoing legal consultation included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Private Limited Company */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary-900 mb-6">
                Private Limited Company Registration in India – Fast, Affordable
                & Online
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Starting a company is exciting—but the legal process can be
                  confusing. At Kanoonwise.com, we make it simple. We help
                  founders, students, and entrepreneurs set up their Private
                  Limited Company (Pvt Ltd) in a smooth, fully online process.
                </p>
                <p>
                  From choosing the right name to getting your Certificate of
                  Incorporation, we handle the details while you focus on your
                  business.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                What makes a Private Limited Company special?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>A separate legal entity</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>Protected by limited liability</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    A structure that inspires trust among banks, investors, and
                    clients
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span>
                    Flexible enough for startups and businesses looking to scale
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
              How the process works
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's how your company gets registered with us
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Apply for DSC and DIN
              </h3>
              <p className="text-gray-600 text-sm">
                Apply for DSC and DIN for the directors
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
                Reserve your company name through the MCA system
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Draft & Submit Papers
              </h3>
              <p className="text-gray-600 text-sm">
                Draft and submit incorporation papers (MoA and AoA)
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
                Receive your digital Certificate of Incorporation, along with
                PAN and TAN
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-500 text-primary-900 rounded-full mb-6">
                <span className="text-xl font-bold">5</span>
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Open Bank Account
              </h3>
              <p className="text-gray-600 text-sm">
                Open a current account for your business and stay compliant
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
                What documents are needed?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                To begin registration, you'll need:
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-id-card text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">
                      Identity Proof
                    </h4>
                    <p className="text-gray-600 text-sm">
                      PAN, Aadhaar, Passport, or Voter ID of all directors
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
                      Latest utility bill or rent agreement
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
                      Passport-size photographs of directors
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <i className="fas fa-file-contract text-accent-500 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-primary-900">NOC</h4>
                    <p className="text-gray-600 text-sm">
                      No Objection Certificate from property owner if office is
                      rented
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                After registration: compliance made easy
              </h3>
              <p className="text-gray-600 mb-6">
                Once incorporated, your company will have yearly obligations. We
                provide assistance with:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Filing annual returns and ROC compliance
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Maintaining accounts, audits, and bookkeeping
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Tax filings, including GST
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-green-500 mt-1"></i>
                  <span className="text-gray-700">
                    Additional registrations—MSME, ISO, IEC, or FSSAI
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
                How many directors are required?
              </h3>
              <p className="text-gray-700">
                At least two directors and two shareholders are needed.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Is there a minimum capital requirement?
              </h3>
              <p className="text-gray-700">
                No, the Companies Act, 2013 does not prescribe a minimum paid-up
                capital.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                How long does the registration take?
              </h3>
              <p className="text-gray-700">
                On average, it takes 7–10 working days, depending on MCA
                approvals.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Can foreigners register a Pvt Ltd in India?
              </h3>
              <p className="text-gray-700">
                Yes, foreign nationals and NRIs can be shareholders or
                directors.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Do I need GST registration as soon as I incorporate?
              </h3>
              <p className="text-gray-700">
                Only if your turnover crosses the GST threshold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Register Your Private Limited Company?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of entrepreneurs who trust Kanoonwise for their
            company registration needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleGetStarted(plans[0])}
              className="bg-accent-500 hover:bg-accent-400 text-primary-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started - ₹1,199
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

export default PrivateLimitedRegistration;
