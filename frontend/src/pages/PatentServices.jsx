import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const PatentServices = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "provisional",
      name: "Provisional Patent Filing",
      price: "₹19,999",
      description:
        "Early-stage innovators & startups needing to quickly secure a priority date and 'Patent Pending' status",
      features: [
        "In-depth Patentability Search",
        "BONUS: Inventor's NDA Template",
        "Drafting of Provisional Specification",
        "Filing & Securing 'Patent Pending' Status",
        "Our Procedural Guarantee",
        "Search Report Turnaround: 5 Business Days",
        "Application Draft for Review: 10 Business Days",
      ],
      popular: false,
      timeline: "10-15 days",
    },
    {
      id: "complete",
      name: "Complete Patent Prosecution",
      price: "₹74,999",
      description:
        "Inventors and businesses ready for full, long-term patent protection and official examination",
      features: [
        "Everything in Provisional Package",
        "Drafting of Complete Specification & Claims",
        "Filing of Complete Application",
        "Handling First Examination Report (FER)",
        "Annual Partnership Advantage Plan (Included)",
        "Search Report Turnaround: 5 Business Days",
        "Application Draft for Review: 15 Business Days",
        "Payment Plan: 3 EMIs of ~₹25,000",
      ],
      popular: true,
      timeline: "15-20 days",
    },
  ];

  const whoWeHelp = [
    {
      title: "For Tech Startups",
      description:
        "A patent is your key to securing investment, deterring competitors, and establishing a defensible position in a crowded market.",
      icon: "fas fa-rocket",
    },
    {
      title: "For Individual Inventors",
      description:
        "We guide you through every step of the complex process, protecting your creation and empowering you to license or commercialize your invention with confidence and legal security.",
      icon: "fas fa-user-tie",
    },
    {
      title: "For University & Corporate R&D",
      description:
        "We act as an extension of your research and development team, helping you protect significant investments in innovation by building a robust patent portfolio that safeguards your technology for the long term.",
      icon: "fas fa-university",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Idea Disclosure & NDA",
      description:
        "You share your invention with us under a strict Non-Disclosure Agreement.",
    },
    {
      step: 2,
      title: "Patentability Search",
      description:
        "Our experts conduct a global search for similar technologies and provide a detailed report on your invention's patentability.",
    },
    {
      step: 3,
      title: "Application Drafting & Filing",
      description:
        "We expertly draft your application (Provisional or Complete) and file it with the Patent Office. You can now officially use the 'Patent Pending' status.",
    },
    {
      step: 4,
      title: "Publication",
      description:
        "Your application is published in the official patent journal (18 months from filing).",
    },
    {
      step: 5,
      title: "Examination & Prosecution",
      description:
        "An Examiner reviews your application and issues an Examination Report (FER). Our team prepares and files a robust legal and technical response.",
    },
    {
      step: 6,
      title: "Grant of Patent",
      description:
        "Once all objections are cleared, your patent is granted! You receive the patent certificate and have exclusive rights over your invention for the next two decades, subject to annual renewals.",
    },
  ];

  const commonPitfalls = [
    {
      title: "Public Disclosure Before Filing",
      description:
        "Never publicly reveal your invention before filing at least a provisional application. Discussing it at a trade show, publishing a paper, or even selling a product based on it can destroy its 'novelty,' making it permanently unpatentable.",
    },
    {
      title: "Incomplete Documentation",
      description:
        "The application must describe the invention in enough detail for another expert in the field to replicate it. Hiding the 'secret sauce' or providing an incomplete description can lead to rejection or the invalidation of your patent later on.",
    },
    {
      title: "Waiting Too Long to File",
      description:
        "India operates on a 'first-to-file' system. If someone else independently creates and files a similar invention even one day before you, they will have the legal right to the patent, not you. Speed is critical.",
    },
  ];

  const faqs = [
    {
      question: "What makes an invention patentable in India?",
      answer:
        "Your invention must be new (novelty), involve an inventive step (be non-obvious to a professional in the field), and have an industrial application (be useful).",
    },
    {
      question:
        "What is the difference between a Provisional and a Complete Application?",
      answer:
        "A Provisional Application secures a filing date and 'Patent Pending' status for 12 months. A Complete Application is the formal document with legally binding claims that is examined for the grant of a 20-year patent.",
    },
    {
      question: "How do I protect my invention in other countries?",
      answer:
        "The most streamlined method is filing an application through the Patent Cooperation Treaty (PCT). This allows you to file a single 'international' application and then select, at a later date, in which of the 150+ member countries you wish to seek patent protection. We provide specialized services for international filings.",
    },
    {
      question: "What happens after my patent is granted?",
      answer:
        "To keep the patent active for the full 20-year term, you must pay annual renewal fees (annuities) to the Patent Office. Failure to pay these fees on time will cause the patent to lapse.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 rounded-full px-4 py-2 border border-blue-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
                  <i className="fas fa-lightbulb text-white text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-blue-400">
                  💡 Patent Protection
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  From Idea to Asset.
                  <br />
                  <span className="text-blue-400">
                    Secure Your 20-Year Monopoly.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Your invention has the power to redefine an industry. A patent
                  transforms your groundbreaking idea from a vulnerable concept
                  into a legally protected, high-value asset, giving you the
                  exclusive right to control its use for two decades.
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
                  className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Schedule Your Confidential Invention Disclosure
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("who-we-help-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Patent Benefits */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Why Invest in a Professional Patent?
                </h3>
                <p className="text-gray-300 mb-6">
                  Our commitment to value and expertise
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Unmatched Expertise
                  </h4>
                  <p className="text-sm text-gray-300">
                    Our registered Patent Agents are qualified engineers and
                    scientists with law degrees.
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Intensive Labor & Precision
                  </h4>
                  <p className="text-sm text-gray-300">
                    A high-quality patent application requires 40-60+ hours of
                    dedicated work.
                  </p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    20-Year Asset
                  </h4>
                  <p className="text-sm text-gray-300">
                    A strong patent is a multi-million rupee asset that attracts
                    investors and blocks competitors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section id="who-we-help-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Tailored for Every{" "}
              <span className="text-blue-600">Innovator</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide strategic patent protection for a diverse range of
              clients, understanding the unique goals of each.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whoWeHelp.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                  <i className={`${item.icon} text-blue-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Choose Your Path to{" "}
              <span className="text-blue-600">Patent Protection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer two clear, strategic packages designed for the different
              stages of the invention lifecycle. All prices are for our
              professional fees and are exclusive of government fees.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular ? "ring-2 ring-blue-500 transform scale-105" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
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
                      + Government fees (separate)
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
                      serviceName="Patent Services"
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

      {/* Common Pitfalls Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Common Patent{" "}
              <span className="text-red-600">Pitfalls to Avoid</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigating the patent process is complex. Here are critical
              mistakes we help our clients avoid:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {commonPitfalls.map((pitfall, index) => (
              <div
                key={index}
                className="bg-red-50 rounded-lg p-6 border border-red-200"
              >
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full mr-3">
                    <i className="fas fa-exclamation-triangle text-sm"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {pitfall.title}
                  </h3>
                </div>
                <p className="text-gray-600">{pitfall.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Procedural Guarantee
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              The patent process is long, with strict deadlines. We provide
              peace of mind with our guarantee:
            </p>
            <div className="bg-white rounded-lg p-6 border border-blue-300">
              <p className="text-gray-800 font-medium italic">
                "We guarantee that your patent application will not be abandoned
                or face penalties due to any missed statutory deadlines or
                procedural errors on our part during the prosecution stage."
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
              Our Transparent Path to a{" "}
              <span className="text-blue-600">Granted Patent</span>
            </h2>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full font-bold text-lg">
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
              Frequently Asked <span className="text-blue-600">Questions</span>
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
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Your Innovation Deserves to be Protected.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't let your hard work be copied or compromised. Take the first
            step towards securing your invention with a powerful legal asset.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("packages-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Book My Free & Confidential Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PatentServices;
