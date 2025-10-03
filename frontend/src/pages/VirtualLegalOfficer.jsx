import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const VirtualLegalOfficer = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      id: "advisory",
      name: "VLO Advisory Plan",
      price: "₹14,999",
      period: "/month",
      description:
        "On-demand legal counsel. Your go-to expert for quick questions, document reviews, and foundational legal guidance.",
      features: {
        "CORE ADVISORY": [
          "Unlimited Legal Consultations (Email & Scheduled Calls)",
          "Review of Business Documents (up to 5/month)",
        ],
      },
      popular: false,
      color: "blue",
    },
    {
      id: "growth",
      name: "VLO Growth Plan",
      price: "₹39,999",
      period: "/month",
      description:
        "A proactive legal department. We not only advise but also actively draft your core business contracts and manage your key compliance.",
      features: {
        "CORE ADVISORY": ["Everything in Advisory Plan"],
        "PROACTIVE DRAFTING & MANAGEMENT": [
          "Custom Drafting of Business Contracts (up to 3/month)",
          "Management of your IP Portfolio (Trademarks & Copyrights)",
          "Complete Annual Compliance Management (ROC & Tax)",
        ],
      },
      popular: true,
      color: "green",
    },
    {
      id: "strategic",
      name: "VLO Strategic Plan",
      price: "Request a Custom Quote",
      period: "",
      description:
        "A strategic legal partner. We become an extension of your leadership team, providing high-level support for negotiations and board-level decisions.",
      features: {
        "CORE ADVISORY": ["Everything in Growth Plan"],
        "STRATEGIC PARTNERSHIP": [
          "Support in Commercial Negotiations (Virtual)",
          "Attendance at one Board Meeting per Quarter (Virtual)",
          "Custom Legal & Compliance Audits",
        ],
      },
      popular: false,
      color: "purple",
    },
  ];

  const whyVLO = [
    {
      title: "Go Beyond Legal Advice, Get a Strategic Partner",
      description:
        "Your VLO doesn't just answer isolated legal questions. They invest time to learn the ins and outs of your business model, your industry, your team, and your long-term goals. This deep understanding allows them to provide context-aware, strategic advice that aligns with your commercial objectives, not just your legal obligations.",
    },
    {
      title: "Unlock Speed and Agility in a Competitive Market",
      description:
        "In business, speed is a competitive advantage. Instead of spending days finding and briefing a new lawyer for every contract or issue, your VLO already knows your business intimately. They can provide expert reviews and advice on new deals, partnerships, or HR matters in a fraction of the time, helping you close deals and make critical decisions faster.",
    },
    {
      title: "Transform Legal from a Cost Center to a Value Driver",
      description:
        "A VLO helps you proactively identify and protect valuable intellectual property (like your brand or software), strengthen your negotiating position with powerful contracts, and ensure your corporate structure is pristine for future fundraising—turning legal compliance into a tangible business asset that adds directly to your company's valuation.",
    },
  ];

  const vloActivities = [
    {
      title: "Contract Lifecycle Management",
      activities: [
        "Drafting: Creating custom, robust agreements for your clients, vendors, and employees.",
        "Reviewing: Analyzing third-party contracts before you sign, highlighting risks and suggesting favorable amendments.",
        "Managing: Creating a central repository for all your agreements and tracking key dates for renewals or terminations.",
      ],
    },
    {
      title: "Compliance Calendar Management",
      activities: [
        "We create and maintain a calendar of all your mandatory legal deadlines (ROC filings, tax, licenses, etc.) and manage the entire filing process, ensuring you never miss a critical date.",
      ],
    },
    {
      title: "Strategic Risk Assessment & Mitigation",
      activities: [
        "We conduct regular reviews of your business operations, website policies (Terms of Service, Privacy Policy), marketing campaigns, and HR policies to identify potential legal risks and recommend corrective actions before they become disputes.",
      ],
    },
    {
      title: "Corporate Governance & Secretarial Support",
      activities: [
        "Your VLO assists with drafting official board resolutions, maintaining your statutory registers, and ensuring your company's internal governance is clean and compliant—a critical factor for investors and for maintaining limited liability.",
      ],
    },
  ];

  const faqs = [
    {
      question: "What is a Virtual Legal Officer?",
      answer:
        "A VLO is an outsourced legal expert who functions like an in-house counsel for your company. They provide continuous, dedicated legal support on a subscription basis, which is far more cost-effective than hiring a full-time lawyer.",
    },
    {
      question:
        "What's the difference between a VLO and just hiring a lawyer when I need one?",
      answer:
        "Hiring a traditional lawyer is reactive and transactional; you pay high hourly rates for a specific task, and they have to learn about your business each time. A VLO is a proactive, relationship-based partnership. Your VLO already knows your business, allowing them to provide faster, more strategic advice at a predictable monthly cost, ultimately preventing many problems from ever occurring.",
    },
    {
      question: "Why is the Strategic Plan custom-priced?",
      answer:
        "The Strategic Plan involves a much deeper, more integrated level of support, including participation in negotiations and board meetings. The scope of this work can vary significantly between businesses. A custom quote allows us to tailor a plan and price that perfectly matches the unique strategic needs of your company.",
    },
    {
      question: "How do we interact with our VLO?",
      answer:
        "Communication is seamless. You can interact with your VLO via scheduled video/phone calls, email, and shared document platforms, just as you would with an in-house team member.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 to-blue-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 rounded-full px-4 py-2 border border-purple-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-purple-500 rounded-full">
                  <i className="fas fa-user-tie text-white text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-purple-400">
                  👨‍💼 Virtual Legal Officer
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Your In-House Legal Counsel,
                  <br />
                  <span className="text-purple-400">On-Demand.</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Get the strategic advantage of a dedicated legal officer
                  without the full-time cost. Our Virtual Legal Officer (VLO)
                  service embeds an expert legal partner into your operations,
                  providing continuous guidance to mitigate risk, accelerate
                  deals, and drive confident growth—all through a predictable
                  monthly retainer.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("plans-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Schedule Your VLO Strategy Session
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("why-vlo-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - VLO Benefits */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Your Legal Co-Pilot
                </h3>
                <p className="text-gray-300 mb-6">
                  Strategic legal partnership for business growth
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Strategic Partner
                  </h4>
                  <p className="text-sm text-gray-300">
                    Deep understanding of your business model and goals
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Speed & Agility
                  </h4>
                  <p className="text-sm text-gray-300">
                    Fast decisions with expert legal guidance
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Value Driver
                  </h4>
                  <p className="text-sm text-gray-300">
                    Transform legal from cost center to business asset
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why VLO Section */}
      <section id="why-vlo-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Your Legal Co-Pilot for{" "}
              <span className="text-purple-600">Business Growth</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most businesses treat legal support like an emergency service,
              calling a lawyer only after a problem has occurred. This is the
              most expensive and stressful way to manage risk. A VLO acts as
              your company's legal co-pilot, sitting beside you to navigate
              challenges and spot opportunities, ensuring you are always on the
              safest and most efficient path to your destination.
            </p>
          </div>

          <div className="space-y-8">
            {whyVLO.map((item, index) => (
              <div
                key={index}
                className="bg-purple-50 rounded-lg p-6 border border-purple-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VLO Activities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              A Tangible Impact on Your{" "}
              <span className="text-purple-600">Daily Operations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our VLO service is a hands-on partnership. Here are the practical,
              high-value activities your VLO will manage:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {vloActivities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {activity.title}
                </h3>
                <div className="space-y-3">
                  {activity.activities.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <i className="fas fa-check text-purple-500 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Find the Right Level of{" "}
              <span className="text-purple-600">Legal Partnership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our VLO retainer plans are designed to provide clear value and
              predictability for your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  plan.popular
                    ? "ring-2 ring-green-500 transform scale-105 border-green-200"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>

                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {plan.price}
                      <span className="text-lg text-gray-600">
                        {plan.period}
                      </span>
                    </div>
                    {plan.id === "strategic" && (
                      <div className="text-sm text-gray-600 mb-4">
                        Custom pricing based on your needs
                      </div>
                    )}
                  </div>

                  {/* Replace button with PublicBusinessServicePayment for non-strategic plans */}
                  {plan.id === "strategic" ? (
                    <button
                      onClick={() => {
                        const message = encodeURIComponent(
                          `Hi! I'm interested in the ${plan.name}. Please help me understand how a Virtual Legal Officer can benefit my business with custom strategic support.`
                        );
                        window.open(
                          `https://wa.me/919876543210?text=${message}`,
                          "_blank"
                        );
                      }}
                      className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-6 bg-purple-500 hover:bg-purple-400 text-white"
                    >
                      Request Quote
                    </button>
                  ) : (
                    <div className="mb-6">
                      <PublicBusinessServicePayment
                        serviceName="Virtual Legal Officer"
                        packageData={{
                          id: plan.id,
                          name: plan.name,
                          price: plan.price.replace('₹', '').replace(',', ''),
                          description: plan.description,
                          features: Object.values(plan.features).flat()
                        }}
                        buttonText={`Get Started - ${plan.price}`}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    {Object.entries(plan.features).map(
                      ([category, features], categoryIndex) => (
                        <div key={categoryIndex}>
                          <h4 className="font-semibold mb-3 text-sm text-purple-600">
                            {category}
                          </h4>
                          <div className="space-y-2">
                            {features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-start space-x-3"
                              >
                                <i className="fas fa-check text-green-500 mt-1 flex-shrink-0 text-sm"></i>
                                <span className="text-gray-700 text-sm">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Frequently Asked Questions about{" "}
              <span className="text-purple-600">VLO</span>
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Embed a Legal Expert into Your Team.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Stop making critical business decisions in the dark. Elevate your
            strategy with a dedicated Virtual Legal Officer.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("plans-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Schedule a VLO Strategy Session
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VirtualLegalOfficer;
