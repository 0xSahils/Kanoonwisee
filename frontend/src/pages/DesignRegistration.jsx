import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const DesignRegistration = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "design-basic",
      name: "Design Basic",
      price: "₹9,999",
      description: "Protecting a single, straightforward product design",
      features: [
        "Expert Consultation",
        "Comprehensive Design Search",
        "Preparation of Drawings/Representations",
        "Filing Accuracy Guarantee",
        "Application Drafting & Filing (1 Design)",
      ],
      popular: false,
      timeline: "6-9 months",
    },
    {
      id: "design-professional",
      name: "Design Professional",
      price: "₹19,999",
      description: "Businesses with a product line or more complex designs",
      features: [
        "Everything in Design Basic",
        "Application Drafting & Filing (up to 3 Related Designs)",
        "Response to Basic Objections",
      ],
      popular: true,
      timeline: "6-9 months",
    },
    {
      id: "design-enterprise",
      name: "Design Enterprise",
      price: "₹34,999",
      description: "Companies seeking comprehensive portfolio protection",
      features: [
        "Everything in Design Professional",
        "Handling All Objections & Hearings",
        "Portfolio Management Advice",
        "Priority Processing",
        "Dedicated Account Manager",
      ],
      popular: false,
      timeline: "6-9 months",
    },
  ];

  const whoWeHelp = [
    {
      title: "Product Designers & Manufacturers",
      description:
        "Protect the unique shape and configuration of your newly developed consumer goods, electronics, furniture, or tools.",
      icon: "fas fa-cube",
      examples: [
        "Consumer Electronics",
        "Furniture Design",
        "Tool Design",
        "Home Appliances",
      ],
    },
    {
      title: "Fashion & Jewelry Designers",
      description:
        "Safeguard your original patterns on textiles, the unique cut of a garment, or the intricate design of a piece of jewelry.",
      icon: "fas fa-gem",
      examples: [
        "Textile Patterns",
        "Garment Cuts",
        "Jewelry Designs",
        "Accessories",
      ],
    },
    {
      title: "Tech Companies",
      description:
        "Secure the ornamental design of your hardware, from the look of a smartphone to the unique aesthetics of a wearable device.",
      icon: "fas fa-mobile-alt",
      examples: [
        "Smartphone Design",
        "Wearable Devices",
        "Computer Hardware",
        "Gaming Devices",
      ],
    },
    {
      title: "Packaging Innovators",
      description:
        "Protect the unique shape and surface pattern of bottles, containers, and other packaging that makes your product stand out on the shelf.",
      icon: "fas fa-box",
      examples: [
        "Bottle Shapes",
        "Container Design",
        "Packaging Patterns",
        "Label Design",
      ],
    },
  ];

  const whyRegister = [
    {
      title: "🎨 Prevents Imitation",
      description:
        "A design registration gives you the exclusive right to the look of your product for up to 15 years. It is a powerful legal tool to stop competitors from making, selling, or importing products that are obvious copies of your design.",
    },
    {
      title: "⭐ Enhances Brand Value & Identity",
      description:
        "Unique, protected designs become synonymous with your brand, building recognition and value. The iconic shape of a Coca-Cola bottle or the unique look of a Dyson vacuum cleaner are classic examples of design driving brand identity.",
    },
    {
      title: "⚖️ Faster and More Cost-Effective than a Patent",
      description:
        "The design registration process is typically much faster and more affordable than patenting. It offers a quick and powerful way to secure protection for your product's visual innovations while you work on protecting its function.",
    },
    {
      title: "💼 Creates a Commercial Asset",
      description:
        "A registered design is an intellectual property asset. It can be licensed to others for royalties, sold as part of a business deal, and used to strengthen your company's valuation.",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Strategy & Search",
      description:
        "The process begins with a free consultation to understand your product's unique design. We then conduct a search of existing registered designs to assess its novelty and provide a clear go-forward strategy.",
    },
    {
      step: 2,
      title: "Drafting & Filing",
      description:
        "This is the most critical stage. Our experts prepare the precise, multi-view drawings (representations) required by the Design Office and file the application on your behalf.",
    },
    {
      step: 3,
      title: "Examination & Registration",
      description:
        "The application is formally examined by the government for compliance. Once approved, the design is registered and published. Your protection is valid for 10 years and can be renewed for an additional 5 years.",
    },
  ];

  const faqs = [
    {
      question: "What can be protected by a Design Registration?",
      answer:
        "You can protect the features of shape, configuration, pattern, ornament, or composition of lines or colours applied to any article. The design must be new, original, and appeal to the eye.",
    },
    {
      question: "What is the 'novelty' requirement for a design?",
      answer:
        "To be registrable, your design must not have been published or used in any country before the date of your application. You must file for protection before you commercially launch or advertise your product.",
    },
    {
      question: "Are government fees included in your price?",
      answer:
        "No, our prices cover our professional fees. Government fees are separate and charged at actuals to ensure transparency. As of September 2025, the fee for a Small Entity/Individual is ₹1,000.",
    },
    {
      question: "How is a Design different from a Patent?",
      answer:
        "A Design Registration protects how a product looks (its aesthetic features). A Patent protects how a product works (its functional invention). For example, a smartphone can have a patent for its internal technology and a design registration for its unique shape and appearance.",
    },
    {
      question: "How long does design protection last?",
      answer:
        "Design registration protection lasts for 10 years from the date of registration and can be renewed for an additional 5 years, giving you a total of 15 years of protection.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-indigo-500/20 rounded-full px-4 py-2 border border-indigo-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-indigo-500 rounded-full">
                  <i className="fas fa-palette text-white text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-indigo-400">
                  🎨 Design Protection
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Protect Your Product's Look.
                  <br />
                  <span className="text-indigo-400">Own Your Design.</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  In a competitive market, your product's unique appearance is
                  your silent salesman. We provide fast, expert registration to
                  ensure your design remains exclusively yours.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("packages-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get a Free Design Consultation
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("why-register-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Design Examples */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Design Protection Examples
                </h3>
                <p className="text-gray-300 mb-6">
                  Famous designs that became iconic brands
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-400 mb-2">
                    Coca-Cola
                  </div>
                  <div className="text-sm text-gray-300">Bottle Shape</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-400 mb-2">
                    Dyson
                  </div>
                  <div className="text-sm text-gray-300">Vacuum Design</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-400 mb-2">
                    iPhone
                  </div>
                  <div className="text-sm text-gray-300">Phone Design</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-400 mb-2">
                    AirPods
                  </div>
                  <div className="text-sm text-gray-300">Earbud Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Register Section */}
      <section id="why-register-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Design Registration is a{" "}
              <span className="text-indigo-600">Smart Business Move</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protecting your product's design ensures your investment in
              creativity pays off, giving you a distinct and legally defensible
              edge in the marketplace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyRegister.map((item, index) => (
              <div
                key={index}
                className="bg-indigo-50 rounded-lg p-6 border border-indigo-200"
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

      {/* Who We Help Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Design Protection for Innovators{" "}
              <span className="text-indigo-600">Across Industries</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide expert design registration services for a wide array of
              creators and businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whoWeHelp.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mr-4">
                    <i className={`${item.icon} text-indigo-600 text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((example, exampleIndex) => (
                    <span
                      key={exampleIndex}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Find Your <span className="text-indigo-600">Perfect Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike the one-size-fits-all approach, we offer tailored packages
              to match your specific needs—from a single product to a full
              portfolio. All prices are for our professional fees and are
              exclusive of government fees.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  pkg.popular
                    ? "ring-2 ring-indigo-500 transform scale-105 border-indigo-200"
                    : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>

                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {pkg.price}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      + Government fees (₹1,000)
                    </div>

                    <div className="bg-indigo-50 p-3 rounded-lg mb-6">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-clock text-indigo-600 mr-2"></i>
                        <span className="font-semibold text-indigo-800">
                          Timeline: {pkg.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <PublicBusinessServicePayment
                    serviceName="Design Registration"
                    servicePrice={pkg.price.replace('₹', '').replace(',', '')}
                    serviceDescription={`${pkg.name} - ${pkg.description}`}
                    buttonText="Get Started"
                    buttonClass={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-6 ${
                      pkg.popular
                        ? "bg-indigo-500 hover:bg-indigo-400 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      What's included
                    </h4>
                    {pkg.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <i className="fas fa-check text-green-500 mt-1 flex-shrink-0"></i>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full mb-6">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Filing Accuracy Guarantee
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              We are committed to a precise and error-free filing process. This
              is our promise to you.
            </p>
            <div className="bg-white rounded-lg p-6 border border-indigo-300">
              <p className="text-gray-800 font-medium italic">
                "We guarantee that your design application will be drafted and
                filed without any procedural errors. If the Design Office raises
                an objection due to a filing mistake on our part, we will refile
                the application at no additional professional cost."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our Simple 3-Step Path to{" "}
              <span className="text-indigo-600">Design Registration</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've simplified the entire process to get your design protected
              quickly and efficiently.
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500 text-white rounded-full font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
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
              Frequently Asked{" "}
              <span className="text-indigo-600">Questions</span>
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
      <section className="py-20 bg-gradient-to-r from-gray-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Your Design is Your Distinction. Let's Protect It.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            In a competitive marketplace, your unique design is a silent
            salesman. Ensure it remains exclusively yours.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("packages-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Secure Your Product Design Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DesignRegistration;
