import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const TrademarkServices = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "brand-starter",
      name: "Brand Starter",
      price: "₹7,999",
      description: "Perfect for solopreneurs & startups on a budget",
      features: [
        "Comprehensive Trademark Search",
        "Search Success Guarantee",
        "Application Drafting & Filing (1 Class)",
        "Application Status Monitoring",
        "Response to Basic Objections",
        "BONUS: Brand Protection Toolkit (PDF)",
        "Payment Plan Option (2 EMIs)",
      ],
      popular: false,
      timeline: "8-12 months",
    },
    {
      id: "business-shield",
      name: "Business Shield",
      price: "₹12,999",
      description: "Most popular for growing businesses & serious brands",
      features: [
        "Everything in Brand Starter",
        "Filing in up to 3 Classes",
        "Handling All Objections & Hearings",
        "One-Year Trademark Watch",
        "BONUS: Startup Legal Kit (Templates)",
      ],
      popular: true,
      timeline: "8-12 months",
    },
    {
      id: "enterprise-guard",
      name: "Enterprise Guard",
      price: "₹24,999",
      description: "For market leaders & scaled companies",
      features: [
        "Everything in Business Shield",
        "BONUS: Framed Registration Certificate",
        "Priority Processing",
        "Dedicated Account Manager",
        "Quarterly IP Portfolio Review",
      ],
      popular: false,
      timeline: "8-12 months",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Consultation and Strategy",
      description:
        "You discuss your brand, business, and goals with us. We help you identify the right mark and the appropriate classes to file under.",
    },
    {
      step: 2,
      title: "Comprehensive Search & Report",
      description:
        "Our team conducts the detailed trademark search and provides you with a report on the mark's availability and any potential risks.",
    },
    {
      step: 3,
      title: "Application Drafting & Filing",
      description:
        "We draft the application with the correct details and file it with the Trademark Registry. Once filed, you receive an official receipt and can start using the ™ symbol.",
    },
    {
      step: 4,
      title: "Government Examination",
      description:
        "An examiner from the Trademark Office reviews your application to ensure it meets all legal requirements. If they have any objections, they issue an Examination Report.",
    },
    {
      step: 5,
      title: "Response to Objections",
      description:
        "This is where our legal expertise comes in. We draft and file a strong reply to any objections raised, arguing on your behalf.",
    },
    {
      step: 6,
      title: "Journal Publication & Opposition Period",
      description:
        "Once accepted, your trademark is published in the official Trademark Journal for four months. This period allows any third party to oppose the registration.",
    },
    {
      step: 7,
      title: "Registration & Certificate Issuance",
      description:
        "If no one opposes your mark during the publication period, the government approves the registration and issues a digital Registration Certificate. You can now officially use the coveted ® symbol.",
    },
  ];

  const faqs = [
    {
      question: "What is the difference between the ™ and ® symbols?",
      answer:
        "The ™ (Trademark) symbol can be used by anyone to indicate a claim over a brand name, whether it's registered or not. The ® (Registered) symbol can only be legally used after the trademark has been officially registered by the government. Using the ® symbol without a valid registration is illegal.",
    },
    {
      question: "Are government fees included in your price?",
      answer:
        "No. Our prices are for our professional fees only. Government fees are separate and are charged at actuals. This ensures complete transparency. The current government fee for an individual/startup/small enterprise is ₹4,500 per class.",
    },
    {
      question: "How long does the entire registration process take?",
      answer:
        "While we file your application within 48 hours, the government process is lengthy. On average, a straightforward trademark registration in India takes about 8-12 months from filing to final registration.",
    },
    {
      question: "What is a 'trademark class'?",
      answer:
        "The Trademark Office categorizes all goods and services into 45 different classes. You must file your application in the class(es) that correspond to your business activities. For example, clothing is in Class 25, and software services are in Class 42.",
    },
    {
      question:
        "What happens if someone opposes my trademark after publication?",
      answer:
        "Opposition is a separate legal proceeding that is not covered in our standard packages. If someone opposes your mark, we will advise you on the strength of the case and provide a separate, transparent quote for handling the opposition proceedings.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 sm:pt-16 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[60vh] sm:min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-3 sm:px-4 py-2 border border-yellow-500/30">
                <div className="flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 bg-yellow-500 rounded-full">
                  <i className="fas fa-certificate text-gray-900 text-xs"></i>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-yellow-400">
                  🛡️ Trademark Protection
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Secure Your Brand.
                  <br />
                  <span className="text-yellow-400">Own Your Identity.</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Your brand is your most valuable business asset. A registered
                  trademark is the legal shield that grants you exclusive
                  ownership, protects you from copycats, and builds a foundation
                  of customer trust. Let's make your brand legally yours.
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
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Your Free Brand Consultation
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("why-trademark-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Brand Examples */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  What is a Trademark?
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                  A trademark is a unique identifier that connects a product or
                  service to a specific company.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/20 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-2">
                    Google
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Brand Name</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-2">
                    TATA
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Brand Name</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-2">
                    Nike
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Logo & Slogan</div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-2">
                    Apple
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Logo Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trademark Section */}
      <section id="why-trademark-section" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
              Why a Trademark is a{" "}
              <span className="text-yellow-600">Non-Negotiable Asset</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Registering your trademark is one of the most important
              investments you can make. It moves your brand from a vulnerable
              idea to a defensible, valuable asset.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-100 rounded-full mb-4 sm:mb-6">
                <i className="fas fa-shield-alt text-yellow-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                🛡️ Legal Ownership & Protection
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Gain the exclusive, nationwide right to use your brand name and
                logo. This gives you the legal power to stop competitors from
                using a confusingly similar mark.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-100 rounded-full mb-4 sm:mb-6">
                <i className="fas fa-chart-line text-yellow-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                🏦 Creates a Valuable Asset
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                A registered trademark is property. It can be bought, sold,
                licensed (like in a franchise), and used to attract investors,
                adding significant value to your company's balance sheet.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-100 rounded-full mb-4 sm:mb-6">
                <i className="fas fa-handshake text-yellow-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                🤝 Builds Customer Trust
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                The ® symbol is a powerful signal of authenticity and
                legitimacy. It tells customers that you are the genuine source
                of your products or services, building long-term brand loyalty.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-100 rounded-full mb-4 sm:mb-6">
                <i className="fas fa-globe text-yellow-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                🌐 Prevents Cybersquatting
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                It strengthens your claim to your brand's domain name and social
                media handles, helping you fight against online impersonators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages-section" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
              Choose Your{" "}
              <span className="text-yellow-600">Protection Plan</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              We offer three clear, fixed-fee packages designed for every stage
              of your business journey. All prices are exclusive of government
              fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular
                    ? "ring-2 ring-yellow-500 lg:transform lg:scale-105"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-gray-900 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>

                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {pkg.price}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      + Government fees (₹4,500 per class)
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg mb-6">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-clock text-blue-600 mr-2"></i>
                        <span className="font-semibold text-blue-800">
                          Timeline: {pkg.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Public Business Service Payment Component */}
                  <div className="mb-6">
                    <PublicBusinessServicePayment
                      serviceName="Trademark Registration"
                      buttonText={`Get Started - ${pkg.price}`}
                      className="w-full"
                    />
                  </div>

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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Ironclad Search Success Guarantee
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Confidence in our service is paramount. That's why every trademark
              package comes with our Search Success Guarantee.
            </p>
            <div className="bg-white rounded-lg p-6 border border-yellow-300">
              <p className="text-gray-800 font-medium italic">
                "If your trademark application receives a direct objection based
                on a confusingly similar, pre-existing mark that was
                discoverable in the official registry at the time of our search,
                we will draft and file the legal response to that specific
                objection at no additional professional cost."
              </p>
            </div>
            <p className="text-gray-600 mt-4">
              This guarantee ensures that our success is aligned with yours.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              The Trademark Registration{" "}
              <span className="text-yellow-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              When you partner with us, we handle the entire process for you.
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500 text-gray-900 rounded-full font-bold text-lg">
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
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Frequently Asked{" "}
              <span className="text-yellow-600">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
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
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build a Defensible Brand?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't leave your most valuable asset unprotected. A strong brand
            starts with a secure trademark. Let's protect your future today.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("packages-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Your Free Brand Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrademarkServices;
