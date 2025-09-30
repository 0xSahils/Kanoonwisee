import React from "react";
import Header from "../components/landing/Header";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const AnnualLLPCompliance = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "essentials",
      name: "LLP Filing Essentials",
      price: "₹9,999",
      period: "/ year",
      bestFor:
        "LLPs that maintain their own financial statements and just need expert filing.",
      features: [
        "Penalty Protection Guarantee",
        "Filing of Form 11 (Annual Return)",
        "Filing of Form 8 (Statement of Account & Solvency)",
        "Designated Partner KYC",
      ],
      popular: false,
    },
    {
      id: "retainer",
      name: "LLP Compliance Retainer",
      price: "₹19,999",
      period: "/ year",
      bestFor:
        "LLPs wanting a complete, end-to-end solution for their annual compliance.",
      features: [
        "Penalty Protection Guarantee",
        "Filing of Form 11 (Annual Return)",
        "Filing of Form 8 (Statement of Account & Solvency)",
        "Designated Partner KYC",
        "Preparation of LLP Financial Statements",
        "Annual Income Tax Filing for the LLP",
      ],
      popular: true,
    },
  ];

  const faqs = [
    {
      question: "What are the due dates for LLP filings?",
      answer:
        "The due date for Form 11 is May 30th every year. The due date for Form 8 is October 30th every year.",
    },
    {
      question: "What if my LLP had no business activity during the year?",
      answer:
        "Even if your LLP had zero transactions, you are still legally required to file a 'NIL' annual return (Form 8 and Form 11) to avoid penalties.",
    },
    {
      question: "What is our 'Penalty Protection Guarantee'?",
      answer:
        "It's our promise of timeliness and accuracy. If any government penalty is levied due to a delay or filing error on our part, we will cover that penalty.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/supreme_background.webp"
            alt="Annual LLP Compliance Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Keep Your LLP{" "}
              <span className="text-yellow-500">Compliant. Effortlessly.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 leading-relaxed">
              Every Limited Liability Partnership (LLP) in India is required to
              complete its annual filings with the Ministry of Corporate Affairs
              (MCA). We manage your entire LLP compliance, from filing Form 8
              and Form 11 to partner KYC, ensuring you stay compliant and
              penalty-free.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi! I'm interested in Annual LLP Compliance services. Could you please provide me with a free LLP compliance check?"
                );
                window.open(
                  `https://wa.me/919876543210?text=${message}`,
                  "_blank"
                );
              }}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Get My Free LLP Compliance Check
            </button>
          </div>
        </div>
      </section>

      {/* Why LLP Compliance is Mandatory Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              The High Cost of Non-Compliance{" "}
              <span className="text-yellow-600">for Your LLP</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An LLP offers the benefit of limited liability, but this
              protection is contingent upon maintaining good legal standing
              through timely annual filings. Ignoring these deadlines can lead
              to serious consequences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Heavy Daily Penalties
              </h3>
              <p className="text-gray-600">
                The LLP Act imposes a penalty of ₹100 per day, per form for any
                delay in filing. Unlike company filings, there is no upper limit
                on this penalty, meaning it can accumulate to a very large sum.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Designated Partner Disqualification
              </h3>
              <p className="text-gray-600">
                The government can disqualify the Designated Partners from
                incorporating or managing any other LLP or company if the LLP is
                a defaulter.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                LLP Status at Risk
              </h3>
              <p className="text-gray-600">
                If an LLP fails to file its annual returns for a significant
                period, the Registrar has the power to assume the LLP is defunct
                and can strike its name from the register.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Blocks Business Opportunities
              </h3>
              <p className="text-gray-600">
                A poor compliance record makes it difficult to convert your LLP
                into a company, secure bank loans, or win contracts that require
                a review of your legal and financial history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Annual Filing Services for LLPs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Expert Handling of{" "}
              <span className="text-yellow-600">All Mandatory LLP Forms</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of experts manages the entire annual filing process for
              your LLP with precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-file-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Filing of Form 11 (Annual Return)
              </h3>
              <p className="text-gray-600">
                This form contains a summary of the LLP's partners and
                management details. It must be filed annually by May 30th.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Filing of Form 8 (Statement of Account & Solvency)
              </h3>
              <p className="text-gray-600">
                This form contains the financial details of the LLP. It must be
                filed annually by October 30th.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-user-check text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Designated Partner KYC
              </h3>
              <p className="text-gray-600">
                We manage the annual KYC process for all Designated Partners
                holding a DPIN.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-calculator text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Preparation of Financial Statements
              </h3>
              <p className="text-gray-600">
                We assist in preparing the necessary financial statements
                required for the filing of Form 8.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages & Pricing for LLPs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Find Your Perfect{" "}
              <span className="text-yellow-600">LLP Compliance Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer clear, annual packages tailored to the needs of your LLP.
              All prices are for our professional fees and exclude government
              fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular
                    ? "ring-2 ring-yellow-500 transform scale-105"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <div className="bg-yellow-500 text-gray-900 text-center py-2 rounded-t-xl font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{pkg.bestFor}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {pkg.price}
                    </span>
                    <span className="text-gray-600 ml-2">{pkg.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-yellow-500 mt-1 mr-3"></i>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <PublicBusinessServicePayment
                    serviceName={pkg.name}
                    buttonText="Get Started"
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      pkg.popular
                        ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our Simple{" "}
              <span className="text-yellow-600">3-Step LLP Filing Process</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Consultation & Data Collection
              </h3>
              <p className="text-gray-600">
                We begin with a consultation to understand your LLP's activities
                for the year. Our team provides a secure checklist to collect
                all necessary financial data and documents.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Preparation & Review
              </h3>
              <p className="text-gray-600">
                Our experts prepare the LLP's financial statements (for the
                Retainer plan) and draft the necessary forms. We share
                everything with you for your final review and digital signature.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Timely Filing & Confirmation
              </h3>
              <p className="text-gray-600">
                Once approved, we file Form 8 and Form 11 with the MCA well
                before their respective due dates. You receive the official
                government challans as confirmation of a successful filing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Frequently Asked{" "}
              <span className="text-yellow-600">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
              <div className="mb-8">
                <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
                <blockquote className="text-2xl md:text-3xl font-light italic text-gray-200 mb-8">
                  "As partners in a growing consulting firm, we needed an expert
                  to handle our LLP compliance. Kanoonwise's Retainer plan is
                  perfect. They manage our financials and filings seamlessly, so
                  we can focus on our clients. Highly recommend."
                </blockquote>
                <p className="text-yellow-400 font-semibold">
                  - Partner, a Tech Consulting LLP
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Keep Your LLP{" "}
                <span className="text-yellow-500">
                  Protected and Compliant.
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Secure your LLP's legal standing and avoid unlimited penalties.
                Let our experts handle your annual filings with precision and
                care.
              </p>
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi! I'm interested in Annual LLP Compliance services. Could you please provide me with a free LLP compliance check?"
                  );
                  window.open(
                    `https://wa.me/919876543210?text=${message}`,
                    "_blank"
                  );
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Get a Quote for Your LLP
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnualLLPCompliance;
