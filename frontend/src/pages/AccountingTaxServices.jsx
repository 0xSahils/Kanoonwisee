import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";

const AccountingTaxServices = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("growth");

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "startup",
      name: "Startup Plan",
      price: "₹4,999",
      period: "/ month",
      description:
        "The essential accounting foundation for new businesses to stay organized and compliant.",
      features: [
        "Monthly Bookkeeping: Up to 50 transactions",
        "Bank Reconciliation",
        "Monthly Financial Statements (P&L, Balance Sheet)",
        "Annual Company ITR Filing",
      ],
      popular: false,
    },
    {
      id: "growth",
      name: "Growth Plan",
      price: "₹9,999",
      period: "/ month",
      description:
        "A comprehensive solution for growing businesses needing regular insights and dedicated support.",
      features: [
        "Monthly Bookkeeping: Up to 150 transactions",
        "Bank Reconciliation",
        "Monthly Financial Statements (P&L, Balance Sheet)",
        "Annual Company ITR Filing",
        "Vendor & Customer Ledger Management",
        "Dedicated Accountant",
      ],
      popular: true,
    },
    {
      id: "scaleup",
      name: "Scale-Up Plan",
      price: "Custom Pricing",
      period: "",
      description:
        "A full-service financial partnership for established businesses focused on strategic growth.",
      features: [
        "Monthly Bookkeeping: 150+ transactions",
        "Bank Reconciliation",
        "Monthly Financial Statements (P&L, Balance Sheet)",
        "Annual Company ITR Filing",
        "Vendor & Customer Ledger Management",
        "Dedicated Accountant",
        "Quarterly Financial Health Call with Senior CA",
        "Budgeting & Forecasting Assistance",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Is my financial data secure with you?",
      answer:
        "Absolutely. Data security is our highest priority. We sign a strict Non-Disclosure Agreement (NDA) with every client. All documents are shared and stored on secure, encrypted cloud platforms, and access is restricted to authorized personnel only.",
    },
    {
      question: "What exactly does my 'Dedicated Accountant' do?",
      answer:
        "Your Dedicated Accountant is more than just a bookkeeper; they are your financial partner. They are responsible for your account's accuracy, preparing your monthly reports, and serving as your primary point of contact for any questions. For Scale-Up clients, they also facilitate your strategic quarterly calls with a Senior Chartered Accountant.",
    },
    {
      question: "What accounting software do you use?",
      answer:
        "We are proficient with all major cloud accounting platforms in India, including Zoho Books, Tally, and QuickBooks. We can work with your existing software or recommend the best platform for your business needs.",
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
            alt="Accounting & Tax Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Financial Clarity for{" "}
              <span className="text-yellow-500">Smarter Decisions.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 leading-relaxed">
              Move beyond simple data entry. We transform your raw financial
              data into a clear, actionable roadmap for growth. Our professional
              accounting and tax services provide the insights you need to
              manage cash flow, boost profitability, and build a financially
              sound business with complete confidence.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi! I'm interested in Accounting & Tax Services. Could you please provide me with a free accounting consultation?"
                );
                window.open(
                  `https://wa.me/919876543210?text=${message}`,
                  "_blank"
                );
              }}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Get a Free Accounting Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Why Professional Accounting Matters Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              From Reactive Bookkeeping to{" "}
              <span className="text-yellow-600">Proactive Strategy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Think of professional accounting as the central dashboard for your
              business. Without it, you're flying blind, making critical
              decisions based on guesswork. With it, you gain the control and
              foresight needed to navigate the future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Make Data-Driven Decisions
              </h3>
              <p className="text-gray-600">
                We move you beyond just knowing your bank balance. With our
                reports, you can identify your true cash burn rate, pinpoint
                your most profitable products or services, and discover
                opportunities for strategic cost-saving.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ensure Maximum Tax Efficiency
              </h3>
              <p className="text-gray-600">
                Meticulous, year-round bookkeeping is the key to a stress-free
                tax season. We ensure every expense is categorized correctly so
                that when it's time to file your ITR, you can claim every
                eligible deduction and minimize your tax liability legally and
                ethically.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gain Unshakeable Investor Confidence
              </h3>
              <p className="text-gray-600">
                Investors and lenders don't just want to see profits; they want
                to see professionally managed finances. Clean, accurate, and
                timely financial statements are a non-negotiable requirement for
                any due diligence process, signaling that your business is a
                serious and secure investment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Free Up Your Most Valuable Asset: Your Time
              </h3>
              <p className="text-gray-600">
                Your time is best spent on innovation, customer relationships,
                and strategy. Stop wrestling with complex spreadsheets and data
                entry. Delegate your financial management to our expert team and
                reclaim your focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Accounting & Tax Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Your Virtual{" "}
              <span className="text-yellow-600">
                Accounting & Tax Department
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a complete suite of services to manage your company's
              financial records and tax obligations with precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-book text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Monthly Bookkeeping & Ledger Management
              </h3>
              <p className="text-gray-600">
                This is the core of our service. We meticulously record every
                transaction, including proper ledger management, journal
                entries, and categorization of every income and expense item to
                ensure your books are always accurate and up-to-date.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-chart-bar text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Financial Statement Preparation
              </h3>
              <p className="text-gray-600">
                We prepare and deliver your key financial reports. The Profit &
                Loss Statement shows your profitability over a period, the
                Balance Sheet provides a snapshot of your company's financial
                health, and the Cash Flow Statement tracks the actual movement
                of money in and out of your business.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-file-invoice text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Company Income Tax Filing
              </h3>
              <p className="text-gray-600">
                At the end of the financial year, we compile all your financial
                data, prepare your tax computation, and file your company's
                annual Income Tax Return (ITR), ensuring you remain 100%
                compliant while maximizing your legal tax savings.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                MIS Reporting & Analysis
              </h3>
              <p className="text-gray-600">
                We can provide custom Management Information System (MIS)
                reports to give you deeper insights into your business
                performance, such as detailed expense breakdowns, revenue
                trends, or budgeting vs. actuals analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages & Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Choose Your{" "}
              <span className="text-yellow-600">Accounting Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our transparent, monthly subscription plans are designed to scale
              with your business's transaction volume and strategic needs.
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
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
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
                        "Hi! I'm interested in Accounting & Tax Services. Could you please provide me with a free accounting consultation?"
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

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our Simple & Secure{" "}
              <span className="text-yellow-600">Accounting Process</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Consultation & System Setup
              </h3>
              <p className="text-gray-600">
                We start with a free consultation to understand your business,
                industry, and specific accounting needs. We'll then help set up
                your chart of accounts and integrate with your existing software
                (like Zoho or Tally) or help you migrate to a new one.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Monthly Data Collation & Bookkeeping
              </h3>
              <p className="text-gray-600">
                Your only job is to upload your documents (bank statements,
                invoices, receipts) to your dedicated, secure portal. Our team
                takes it from there, handling all the recording, categorization,
                and reconciliation work behind the scenes.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Reporting & Advisory
              </h3>
              <p className="text-gray-600">
                By a fixed date each month, you receive a clear,
                easy-to-understand financial package with key insights, ready
                for your review. For our Growth and Scale-Up clients, your
                dedicated accountant is available to discuss the reports and
                provide strategic advice.
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
                  "Since we started using Kanoonwise's accounting services, I
                  finally have a clear picture of my company's finances. The
                  monthly reports are easy to understand, and our dedicated
                  accountant is incredibly helpful. It's freed up so much of my
                  time to focus on our clients."
                </blockquote>
                <p className="text-yellow-400 font-semibold">
                  - Founder, a Creative Agency
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Ready for{" "}
                <span className="text-yellow-500">Financial Clarity?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Stop making business decisions in the dark. Let our expert team
                manage your accounting and provide the financial insights you
                need to grow.
              </p>
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi! I'm interested in Accounting & Tax Services. Could you please provide me with a free accounting consultation?"
                  );
                  window.open(
                    `https://wa.me/919876543210?text=${message}`,
                    "_blank"
                  );
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Get a Free Accounting Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountingTaxServices;
