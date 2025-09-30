import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const NewStartupLegalKit = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const kits = [
    {
      id: "essential",
      name: "Essential Kit",
      price: "₹24,999",
      fee: 24999,
      description:
        "Getting your company incorporated and establishing a professional identity",
      features: {
        "CORE LEGAL & FORMATION": [
          "Private Limited Company Incorporation",
          "Founders' Agreement (Drafting & Consultation)",
          "1 Year of Strategic & Legal Consultation",
          "Startup India DPIIT Recognition Assistance",
        ],
        "WEBSITE & BRANDING ASSISTANCE": [
          "Professional Domain & Business Email Setup",
        ],
        "ESSENTIAL DOCUMENTATION": ["Essential Legal Templates (NDA)"],
      },
      popular: false,
      timeline: "2-3 weeks",
      savings: "Save ₹15,000+ vs individual services",
    },
    {
      id: "growth",
      name: "Growth Kit",
      price: "₹59,999",
      fee: 59999,
      description:
        "Protecting your brand and launching your online presence as you go to market",
      features: {
        "CORE LEGAL & FORMATION": [
          "Everything in Essential Kit",
          "Share Allotment (First Tranche)",
        ],
        "WEBSITE & BRANDING ASSISTANCE": [
          "Everything in Essential Kit",
          "One-Page Professional Landing Page",
        ],
        "INTELLECTUAL PROPERTY": ["Trademark Registration (1 Class)"],
        "ESSENTIAL DOCUMENTATION": [
          "Everything in Essential Kit",
          "Website Legal Documents (Privacy Policy, T&C)",
        ],
      },
      popular: true,
      timeline: "3-4 weeks",
      savings: "Save ₹25,000+ vs individual services",
    },
    {
      id: "scale-up",
      name: "Scale-Up Kit",
      price: "₹99,999",
      fee: 99999,
      description:
        "Securing all assets and preparing for your first hires, funding, and full market launch",
      features: {
        "CORE LEGAL & FORMATION": ["Everything in Growth Kit"],
        "WEBSITE & BRANDING ASSISTANCE": [
          "Everything in Growth Kit",
          "Complete 5-Page Website Development",
        ],
        "INTELLECTUAL PROPERTY": [
          "Everything in Growth Kit",
          "Copyright Registration (1 Work: Code/Content)",
        ],
        "ESSENTIAL DOCUMENTATION": [
          "Everything in Growth Kit",
          "Employment Agreement Template",
          "Basic ESOP Policy Template",
          "Investor Pitch Deck Review & Feedback",
        ],
        "EXPERT ACCESS": ["Access to Exclusive 'Expert Talk' Webinars"],
      },
      popular: false,
      timeline: "4-6 weeks",
      savings: "Save ₹50,000+ vs individual services",
    },
  ];

  const whyStartupKit = [
    {
      title: "🤝 Prevent Founder Disputes",
      description:
        "A solid Founders' Agreement is the single most important document for preventing future conflicts over equity, roles, and responsibilities.",
    },
    {
      title: "🛡️ Protect Your Valuable Assets",
      description:
        "Secure your brand name (Trademark) and your unique code or content (Copyright) before someone else does.",
    },
    {
      title: "🏦 Become Investor-Ready",
      description:
        "Investors will not fund a business that doesn't have its legal house in order. Our kits ensure your company is structured professionally from the start.",
    },
    {
      title: "💰 Save Thousands in Legal Fees",
      description:
        "Bundling these essential services into a kit provides a massive cost saving compared to engaging a lawyer for each individual task.",
    },
  ];

  const detailedServices = [
    {
      title: "Private Limited Company Incorporation",
      description:
        "The official registration of your startup as a Pvt. Ltd. entity, preferred by investors.",
    },
    {
      title: "Founders' Agreement",
      description:
        "A custom-drafted agreement defining equity, roles, and exit clauses between co-founders to prevent future disputes.",
    },
    {
      title: "Share Allotment (First Tranche)",
      description:
        "The mandatory legal process of formally issuing shares to the founders after incorporation.",
    },
    {
      title: "1 Year of Strategic & Legal Consultation",
      description:
        "A full year of access to our legal experts for questions related to your kit's services.",
    },
    {
      title: "Startup India DPIIT Recognition Assistance",
      description:
        "We help you get recognized by the government, making you eligible for tax exemptions and other benefits.",
    },
    {
      title: "Website & Branding Assistance",
      description:
        "From a professional domain and email to a one-page lander or a full 5-page website, we build your digital presence.",
    },
    {
      title: "Intellectual Property",
      description:
        "We handle the filing for your Trademark (brand name/logo) and Copyright (software code/creative content).",
    },
    {
      title: "Essential Documentation",
      description:
        "You receive a suite of ready-to-use legal templates, including NDAs, Website Policies, Employment Agreements, and a basic ESOP policy.",
    },
    {
      title: "Investor Pitch Deck Review",
      description:
        "Our experts provide critical feedback on your pitch deck to help you make a stronger impression on investors.",
    },
    {
      title: "Expert Talks",
      description:
        "Exclusive access to our online webinars featuring VCs, seasoned founders, and industry experts.",
    },
  ];

  const faqs = [
    {
      question: "What does '1 Year of Consultation' include?",
      answer:
        "It includes unlimited scheduled telephonic and email consultations with our legal experts to address questions about the documents and registrations included in your kit for a full year. This ensures you have ongoing support as you navigate your first year.",
    },
    {
      question: "Is this a one-time fee?",
      answer:
        "Yes, the price for each kit is a one-time fee for all the services and documents listed. Government fees for incorporation, IP filings, etc., are charged separately at actuals.",
    },
    {
      question: "Can I customize a kit?",
      answer:
        "While the kits offer the best value as a bundle, you can always add any of our other services on an a la carte basis. Just let us know during your consultation.",
    },
    {
      question: "Why is a Founders' Agreement so important?",
      answer:
        "Founder disputes are one of the top reasons startups fail. A Founders' Agreement acts as a 'prenup' for your business, clearly defining ownership, roles, and what happens if someone leaves. It provides a clear roadmap, preventing conflicts that could destroy the company.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 to-blue-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-green-500/20 rounded-full px-4 py-2 border border-green-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                  <i className="fas fa-rocket text-white text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-green-400">
                  🚀 Complete Startup Foundation
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  From Idea to Launch.
                  <br />
                  <span className="text-green-400">
                    Your Complete Startup Foundation.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Launch your business on a rock-solid legal foundation. Our
                  all-in-one Startup Legal Kits bundle every essential
                  registration, document, and consultation you need to
                  incorporate your company, protect your brand, and get
                  investor-ready from day one.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("kits-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Choose Your Startup Kit
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("why-kit-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Kit Overview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  What's in Your Kit?
                </h3>
                <p className="text-gray-300 mb-6">
                  Everything you need to launch legally
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-building text-green-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">
                    Company Formation
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-handshake text-green-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">
                    Founder Agreements
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-certificate text-green-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">
                    IP Protection
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-globe text-green-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">
                    Digital Presence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Startup Kit Section */}
      <section id="why-kit-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Build Your Dream on a{" "}
              <span className="text-green-600">Foundation of Confidence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Starting a business involves countless risks. Your legal structure
              shouldn't be one of them. A Startup Legal Kit is essential to:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyStartupKit.map((item, index) => (
              <div
                key={index}
                className="bg-green-50 rounded-lg p-6 border border-green-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kits Section */}
      <section id="kits-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Find the Right Kit for Your{" "}
              <span className="text-green-600">Launch Stage</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've bundled the most critical legal, compliance, and branding
              services into three powerful, fixed-fee kits.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {kits.map((kit) => (
              <div
                key={kit.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  kit.popular ? "ring-2 ring-green-500 transform scale-105" : ""
                }`}
              >
                {kit.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {kit.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{kit.description}</p>

                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {kit.price}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      + Government fees (separate)
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-piggy-bank text-green-600 mr-2"></i>
                        <span className="font-semibold text-green-800 text-sm">
                          {kit.savings}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg mb-6">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-clock text-blue-600 mr-2"></i>
                        <span className="font-semibold text-blue-800">
                          Delivery: {kit.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <PublicBusinessServicePayment 
                    serviceName={kit.name}
                    buttonText={`Get Started - ${kit.price}`}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-6 ${
                      kit.popular
                        ? "bg-green-500 hover:bg-green-400 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  />

                  <div className="space-y-6">
                    {Object.entries(kit.features).map(
                      ([category, features], categoryIndex) => (
                        <div key={categoryIndex}>
                          <h4 className="font-semibold mb-3 text-sm text-green-600">
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

      {/* Detailed Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              What's Included in{" "}
              <span className="text-green-600">Your Kit?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {detailedServices.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
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
              Frequently Asked <span className="text-green-600">Questions</span>
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

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
              <i className="fas fa-quote-left text-white text-2xl"></i>
            </div>
            <blockquote className="text-xl text-gray-800 font-medium italic mb-6">
              "The Scale-Up Kit from Kanoonwise is the most comprehensive
              startup package I've ever seen. They handled our incorporation,
              trademark, legal documents, AND built our first professional
              website. It saved us months of work and coordination. It's the
              ultimate launchpad for any new founder."
            </blockquote>
            <p className="text-gray-600 font-semibold">
              - Founder, a SaaS Startup
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-green-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Build Your Dream on a Solid Foundation.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Give your startup the complete legal, IP, and digital foundation it
            deserves.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("kits-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Choose Your Startup Kit Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewStartupLegalKit;
