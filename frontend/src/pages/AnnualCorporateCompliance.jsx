import React from "react";
import Header from "../components/landing/Header";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";
import { Lock, Building2 } from "lucide-react";

const AnnualCorporateCompliance = () => {
  // const navigate = useNavigate();
  // const [selectedPlan, setSelectedPlan] = useState("retainer");

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "essentials",
      name: "Filing Essentials",
      price: "₹14,999",
      period: "/ year",
      bestFor:
        "Businesses that handle internal documents and need an expert for mandatory filing.",
      features: [
        "Penalty Protection Guarantee",
        "Mandatory ROC Filings (AOC-4, MGT-7, KYC)",
        "Preparation of Financial Statements",
      ],
      popular: false,
    },
    {
      id: "retainer",
      name: "Annual Compliance Retainer",
      price: "₹29,999",
      period: "/ year",
      bestFor:
        "SMEs and startups wanting an end-to-end annual compliance solution.",
      features: [
        "Penalty Protection Guarantee",
        "Mandatory ROC Filings (AOC-4, MGT-7, KYC)",
        "Preparation of Financial Statements",
        "AGM & Board Meeting Documentation (Notice, Minutes)",
        "Preparation of Director's Report",
        "Statutory Register Maintenance",
        "Event-Based Filings Included (per year): Up to 2 Director Changes, Up to 1 Address Change",
      ],
      popular: true,
    },
    {
      id: "complete",
      name: "Complete Secretarial",
      price: "₹49,999",
      period: "/ year",
      bestFor:
        "Growing companies needing ongoing support for corporate changes.",
      features: [
        "Penalty Protection Guarantee",
        "Mandatory ROC Filings (AOC-4, MGT-7, KYC)",
        "Preparation of Financial Statements",
        "AGM & Board Meeting Documentation (Notice, Minutes)",
        "Preparation of Director's Report",
        "Statutory Register Maintenance",
        "Event-Based Filings Included (per year): Up to 2 Director Changes, Up to 1 Address Change",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question:
        "What's the main difference between the 'Filing Essentials' and 'Compliance Retainer' plans?",
      answer:
        "The 'Filing Essentials' plan covers the final, mandatory government submission of your financial and annual returns. The 'Annual Compliance Retainer' is a complete solution that also handles the crucial preparatory work before the filing, such as drafting the official documents for your AGM and maintaining your legal registers.",
    },
    {
      question: "What are statutory registers?",
      answer:
        "These are the official internal records of your company, such as the Register of Members, Register of Directors, and Register of Charges. The Companies Act, 2013 mandates that these be kept accurate and up-to-date.",
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
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/supreme_background.webp"
            alt="Annual Corporate Compliance Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block w-8 sm:w-12 lg:w-16 h-1 bg-yellow-500 mb-4 sm:mb-6"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
              Beyond Filing.{" "}
              <span className="text-yellow-500">
                Complete Corporate Compliance.
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-light mb-6 sm:mb-8 text-gray-300 leading-relaxed px-4 sm:px-0">
              Annual filings are just the final step. We manage your entire
              corporate compliance lifecycle—from preparing board meetings and
              maintaining statutory registers to filing your annual returns on
              time, every time.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi! I'm interested in Annual Corporate Compliance services. Could you please provide me with a free compliance health check?"
                );
                window.open(
                  `https://wa.me/919876543210?text=${message}`,
                  "_blank"
                );
              }}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Get My Free Compliance Health Check
            </button>
          </div>
        </div>
      </section>

      {/* Why Compliance is a Non-Negotiable Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block w-8 sm:w-12 h-1 bg-yellow-500 mb-3 sm:mb-4"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
              The High Cost of Non-Compliance:{" "}
              <span className="text-yellow-600">
                Why You Can't Afford an Oversight
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Failing to meet deadlines isn't a minor mistake; it's a
              significant legal and financial risk. The government mandates
              these procedures to ensure transparency, and the penalties for
              default are severe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚫</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Heavy Daily Penalties
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                The Companies Act imposes a steep penalty of ₹100 per day, per
                form for any delay in filing.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚖️</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Director Disqualification
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Prolonged non-compliance can lead to the disqualification of
                directors, preventing them from being appointed to any other
                company for up to 5 years.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Company Status at Risk
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                The ROC can mark the company as "Inactive" or even strike its
                name from the register, effectively shutting it down.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Blocks Future Growth
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                A poor compliance record makes it nearly impossible to secure
                bank loans, raise investment capital, or win government tenders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Comprehensive Secretarial Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block w-8 sm:w-12 h-1 bg-yellow-500 mb-3 sm:mb-4"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
              Your Complete{" "}
              <span className="text-yellow-600">
                Corporate Compliance Solution
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              We handle the full spectrum of secretarial duties required to keep
              your company in good standing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-500 text-gray-900 rounded-full mb-4 sm:mb-6">
                <i className="fas fa-file-alt text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Mandatory Annual Filings
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                We file all required forms with the ROC, including AOC-4
                (Financials) and MGT-7/7A (Annual Return) for Companies, and
                Form 8 & 11 for LLPs.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-500 text-gray-900 rounded-full mb-4 sm:mb-6">
                <i className="fas fa-users text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Meeting & Documentation
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                We handle the preparation of notices, agendas, and minutes for
                your annual Board Meetings and Annual General Meeting (AGM).
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-500 text-gray-900 rounded-full mb-4 sm:mb-6">
                <i className="fas fa-book text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Statutory Register Maintenance
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                We maintain and update your company's internal statutory
                registers, ensuring they are accurate and inspection-ready at
                all times.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-500 text-gray-900 rounded-full mb-4 sm:mb-6">
                <i className="fas fa-sync-alt text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Event-Based Filings
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                We manage the compliance for common corporate changes, such as
                the appointment or resignation of directors, or a change in the
                company's registered office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block w-8 sm:w-12 h-1 bg-yellow-500 mb-3 sm:mb-4"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
              Find Your Perfect{" "}
              <span className="text-yellow-600">Compliance Plan</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              We offer clear, annual packages that scale with your business
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular
                    ? "ring-2 ring-yellow-500 lg:transform lg:scale-105"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <div className="bg-yellow-500 text-gray-900 text-center py-2 rounded-t-xl font-semibold text-sm sm:text-base">
                    Most Popular
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{pkg.bestFor}</p>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {pkg.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-600 ml-2">{pkg.period}</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-yellow-500 mt-1 mr-3 flex-shrink-0"></i>
                        <span className="text-sm sm:text-base text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Public Business Service Payment Component */}
                  <div className="mb-4 sm:mb-6">
                    <PublicBusinessServicePayment
                      serviceName={pkg.name}
                      packageData={pkg}
                      buttonText={`Get Started - ${pkg.price}`}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block w-8 sm:w-12 h-1 bg-yellow-500 mb-3 sm:mb-4"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
              Our Simple <span className="text-yellow-600">3-Step Process</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-500 text-gray-900 rounded-full mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Consultation & Onboarding
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                We start with a consultation to understand your company's
                status. Our team provides a secure checklist to collect all
                necessary documents and data.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-500 text-gray-900 rounded-full mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Continuous Management & Preparation
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Throughout the year, we maintain your registers and prepare all
                necessary documents for your AGM. For event-based changes, we
                handle the filings as they happen.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-yellow-500 text-gray-900 rounded-full mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Timely Annual Filing & Confirmation
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                After your AGM, we file all annual forms with the ROC well
                before the due date. You receive the official government
                challans as confirmation of a successful filing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block w-8 sm:w-12 h-1 bg-yellow-500 mb-3 sm:mb-4"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 px-4 sm:px-0">
              Frequently Asked{" "}
              <span className="text-yellow-600">Questions</span>
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-white/20">
              <div className="mb-6 sm:mb-8">
                <div className="inline-block w-8 sm:w-12 lg:w-16 h-1 bg-yellow-500 mb-4 sm:mb-6"></div>
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light italic text-gray-200 mb-6 sm:mb-8 px-4 sm:px-0">
                  "Kanoonwise's Annual Compliance Retainer is a game-changer.
                  They don't just file our forms; they manage the entire AGM
                  process and keep our records in perfect order. It's the most
                  comprehensive service we've found."
                </blockquote>
                <p className="text-yellow-400 font-semibold">
                  - Director, a Rabee rizwan pvt ltd
                </p>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 px-4 sm:px-0">
                Go Beyond Filing.{" "}
                <span className="text-yellow-500">
                  Achieve True Compliance.
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0">
                Secure your company's legal standing and avoid costly penalties
                with a partner who manages the entire process.
              </p>
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi! I'm interested in Annual Corporate Compliance services. Could you please provide me with a free compliance health check?"
                  );
                  window.open(
                    `https://wa.me/919876543210?text=${message}`,
                    "_blank"
                  );
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Get a Quote for Your Business
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnnualCorporateCompliance;
