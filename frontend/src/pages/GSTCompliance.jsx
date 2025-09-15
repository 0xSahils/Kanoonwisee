import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";

const GSTCompliance = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("standard");

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "registration",
      name: "GST Registration",
      price: "₹2,499",
      period: "(One-time)",
      bestFor: "New businesses needing to get GST registered.",
      features: ["New GSTIN Application", "Expert Consultation"],
      popular: false,
    },
    {
      id: "standard",
      name: "GST Filing - Standard",
      price: "₹19,999",
      period: "/ year",
      bestFor:
        "Growing businesses with a steady volume of monthly transactions.",
      features: [
        "Expert Consultation",
        "Penalty Protection Guarantee",
        "Monthly Bookkeeping for GST",
        "Monthly/Quarterly Return Filings (GSTR-1 & 3B)",
        "Monthly Transaction Limit: Up to 200 transactions",
        "Annual Return Filing (GSTR-9)",
      ],
      popular: true,
    },
    {
      id: "pro",
      name: "GST Filing - Pro",
      price: "₹34,999",
      period: "/ year",
      bestFor:
        "Established businesses with higher transaction volumes needing advanced support.",
      features: [
        "Expert Consultation",
        "Penalty Protection Guarantee",
        "Monthly Bookkeeping for GST",
        "Monthly/Quarterly Return Filings (GSTR-1 & 3B)",
        "Monthly Transaction Limit: Up to 500 transactions",
        "Annual Return Filing (GSTR-9)",
        "Advanced ITC Reconciliation & Advisory",
        "Dedicated GST Expert",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Who needs GST registration?",
      answer:
        "Any business with an annual turnover exceeding ₹40 lakh (for goods) or ₹20 lakh (for services) must register for GST. It is also mandatory for e-commerce sellers, regardless of turnover.",
    },
    {
      question: "What is Input Tax Credit (ITC)?",
      answer:
        "ITC is a credit you can claim for the GST you paid on your business purchases and expenses. This credit reduces your final GST liability, meaning you pay less tax.",
    },
    {
      question: "What are the due dates for GST returns?",
      answer:
        "Typically, GSTR-1 is due on the 11th and GSTR-3B is due on the 20th of the following month for monthly filers. We manage these deadlines so you don't have to.",
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
            alt="GST Compliance Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              GST Compliance,{" "}
              <span className="text-yellow-500">Simplified.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 leading-relaxed">
              From obtaining your GSTIN to filing your monthly and annual
              returns with precision, we handle every aspect of your GST
              compliance. Stay compliant, maximize your Input Tax Credit (ITC),
              and run your business without the tax-time stress.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi! I'm interested in GST Registration & Filing Services. Could you please provide me with a free consultation?"
                );
                window.open(
                  `https://wa.me/919876543210?text=${message}`,
                  "_blank"
                );
              }}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Get My Free GST Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Why GST Compliance is Non-Negotiable Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Smart Businesses Master{" "}
              <span className="text-yellow-600">GST Compliance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proper GST management is more than a legal requirement; it's a
              critical component of your financial health and business
              reputation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Avoid Heavy Penalties & Interest
              </h3>
              <p className="text-gray-600">
                Timely and accurate filing of GST returns is mandatory. Delays
                or errors can result in significant penalties and interest
                charges that impact your cash flow.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Maximize Input Tax Credit (ITC)
              </h3>
              <p className="text-gray-600">
                Correctly filing your returns is the only way to claim ITC on
                your business expenses, directly reducing your GST liability and
                saving you money.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Improve Your GST Compliance Rating
              </h3>
              <p className="text-gray-600">
                The government assigns a compliance rating to businesses based
                on their filing history. A high rating improves your credibility
                with suppliers, customers, and financial institutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enable Seamless Business Operations
              </h3>
              <p className="text-gray-600">
                A valid GSTIN is essential for operating in the modern Indian
                market—from selling on e-commerce platforms to working with
                large corporate clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Complete GST Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Your{" "}
              <span className="text-yellow-600">End-to-End GST Solution</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive suite of services to cover your entire
              GST journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-file-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                GST Registration
              </h3>
              <p className="text-gray-600">
                We manage the complete application process, from document
                preparation to obtaining your Goods and Services Taxpayer
                Identification Number (GSTIN) quickly and efficiently.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-calendar-check text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Monthly & Quarterly Filings
              </h3>
              <p className="text-gray-600">
                We prepare and file your mandatory returns, including GSTR-1
                (details of outward supplies) and GSTR-3B (summary return of
                inward and outward supplies), ensuring accuracy and timeliness.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                GST Annual Return & Reconciliation
              </h3>
              <p className="text-gray-600">
                We compile your financial data for the entire year, perform a
                thorough reconciliation, and file your comprehensive GSTR-9
                annual return.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-user-tie text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Expert GST Advisory
              </h3>
              <p className="text-gray-600">
                Our team is always available to provide expert advice on GST
                applicability, HSN/SAC codes, and strategies to optimize your
                tax position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Find Your Perfect{" "}
              <span className="text-yellow-600">GST Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're just starting or need ongoing support, we have a
              plan designed for your business's scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(
                        "Hi! I'm interested in GST Registration & Filing Services. Could you please provide me with a free consultation?"
                      );
                      window.open(
                        `https://wa.me/919876543210?text=${message}`,
                        "_blank"
                      );
                    }}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      pkg.popular
                        ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-12 text-center">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our{" "}
              <span className="text-yellow-600">
                GST Penalty Protection Guarantee
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We are confident in our ability to manage your GST filings
              accurately and on time. For our annual plan clients, we guarantee
              that your standard GST returns will be filed by the due dates. If
              any penalty is levied by the GSTN portal due to a delay or filing
              error on our part, we will cover that penalty.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our Simple Path to{" "}
              <span className="text-yellow-600">GST Compliance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                For GST Registration:
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Consultation & Document Upload
                    </h4>
                    <p className="text-gray-600">
                      We start with a quick call to understand your business and
                      provide a checklist of required documents (PAN, Aadhaar,
                      business proof, etc.).
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Application & Follow-up
                    </h4>
                    <p className="text-gray-600">
                      We file the application on your behalf and manage all
                      correspondence with the GST department.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      GSTIN Issued
                    </h4>
                    <p className="text-gray-600">
                      You receive your GSTIN and registration certificate, ready
                      for business.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                For Annual GST Filing:
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Onboarding & Data Sharing
                    </h4>
                    <p className="text-gray-600">
                      We set up a secure system for you to share your monthly
                      sales and purchase data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Monthly Filing & Reporting
                    </h4>
                    <p className="text-gray-600">
                      Our team prepares and files your GSTR-1 and GSTR-3B every
                      month/quarter and provides you with a summary report.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Annual Reconciliation
                    </h4>
                    <p className="text-gray-600">
                      At the end of the financial year, we prepare and file your
                      GSTR-9.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
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
              <div key={index} className="bg-gray-50 rounded-xl p-6">
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
                  "Kanoonwise has been managing our GST filings for over a year,
                  and the experience has been flawless. Their team is proactive,
                  accurate, and the peace of mind from their Penalty Protection
                  Guarantee is priceless. Highly recommended."
                </blockquote>
                <p className="text-yellow-400 font-semibold">
                  - Owner, a books and books
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Stop Worrying About{" "}
                <span className="text-yellow-500">GST Deadlines.</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Let our experts handle your GST compliance so you can get back
                to building your business.
              </p>
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi! I'm interested in GST Registration & Filing Services. Could you please provide me with a free consultation?"
                  );
                  window.open(
                    `https://wa.me/919876543210?text=${message}`,
                    "_blank"
                  );
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Get My Free GST Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GSTCompliance;
