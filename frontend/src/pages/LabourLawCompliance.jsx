import React from "react";
import Header from "../components/landing/Header";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const LabourLawCompliance = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "startup",
      name: "Startup Team",
      price: "₹3,499",
      period: "/ month",
      bestFor: "Businesses with a small, core team.",
      features: [
        "Number of Employees: Up to 10",
        "One-time PF & ESI Registration",
        "Timely Filing & Accuracy Guarantee",
        "Monthly PF & ESI Return Filing",
        "Employee Onboarding & Exiting",
        "Expert Email & Phone Support",
      ],
      popular: false,
    },
    {
      id: "growth",
      name: "Growth Team",
      price: "₹6,999",
      period: "/ month",
      bestFor: "Growing businesses expanding their workforce.",
      features: [
        "Number of Employees: Up to 25",
        "One-time PF & ESI Registration",
        "Timely Filing & Accuracy Guarantee",
        "Monthly PF & ESI Return Filing",
        "Employee Onboarding & Exiting",
        "Expert Email & Phone Support",
        "Dedicated Compliance Manager",
      ],
      popular: true,
    },
    {
      id: "scaleup",
      name: "Scale-Up Team",
      price: "Custom Pricing",
      period: "",
      bestFor: "Established companies with larger teams.",
      features: [
        "Number of Employees: 25+",
        "One-time PF & ESI Registration",
        "Timely Filing & Accuracy Guarantee",
        "Monthly PF & ESI Return Filing",
        "Employee Onboarding & Exiting",
        "Expert Email & Phone Support",
        "Dedicated Compliance Manager",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "When is PF registration mandatory in India?",
      answer:
        "EPF registration is mandatory for any establishment that employs 20 or more people.",
    },
    {
      question: "When is ESI registration mandatory?",
      answer:
        "ESI registration is mandatory for non-seasonal establishments in implemented areas with 10 or more employees (with a wage limit for eligibility).",
    },
    {
      question: "What are the main benefits of PF and ESI for an employee?",
      answer:
        "Provident Fund (PF) is a forced savings scheme for retirement. A portion of the employee's salary is saved, with a matching contribution from the employer. ESI is a comprehensive health insurance scheme that provides medical care for the employee and their dependents.",
    },
    {
      question: "Can we register voluntarily even if we have fewer employees?",
      answer:
        "Yes, voluntary registration for both EPF and ESI is possible and is often done by companies who want to offer these benefits to attract and retain talent.",
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
            alt="Labour Law Compliance Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Be a Compliant and{" "}
              <span className="text-yellow-500">Trusted Employer.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 leading-relaxed">
              As your team grows, so do your legal responsibilities. We provide
              expert management of your mandatory PF & ESI obligations, building
              a foundation of trust with your employees and protecting your
              business from significant legal and financial risk.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi! I'm interested in Labour Law Compliance Services (PF & ESI). Could you please provide me with a free labour law consultation?"
                );
                window.open(
                  `https://wa.me/919876543210?text=${message}`,
                  "_blank"
                );
              }}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Get a Free Labour Law Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Why Labour Law Compliance is Essential Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Building a Strong Foundation{" "}
              <span className="text-yellow-600">for Your Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Being a compliant employer is fundamental to sustainable growth
              and a positive company culture. It is a critical responsibility
              that helps you:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Avoid Legal Penalties & Damages
              </h3>
              <p className="text-gray-600">
                Non-compliance with PF and ESI regulations can lead to
                significant financial penalties, interest charges for late
                payments, and even legal proceedings from the authorities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Attract & Retain Top Talent
              </h3>
              <p className="text-gray-600">
                In a competitive job market, providing statutory benefits like
                PF and ESI is a powerful signal that you are a responsible and
                stable employer, making your company more attractive to skilled
                professionals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Protect Your Employees' Future
              </h3>
              <p className="text-gray-600">
                These schemes provide a crucial social security net for your
                team. Provident Fund (PF) builds a retirement corpus, while ESI
                provides comprehensive medical care for employees and their
                families during times of need.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Enhance Your Corporate Reputation
              </h3>
              <p className="text-gray-600">
                A strong compliance record enhances your company's reputation as
                an ethical and reliable employer, which is valued by clients,
                partners, and employees alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Complete Labour Law Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Your Complete{" "}
              <span className="text-yellow-600">
                Employer Compliance Solution
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We handle the entire lifecycle of your PF and ESI obligations with
              expert precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-file-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                PF & ESI Registration
              </h3>
              <p className="text-gray-600">
                We manage the complete registration process to obtain your
                establishment codes for both the Employees' Provident Fund (EPF)
                and Employees' State Insurance (ESI) schemes.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-calendar-check text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Monthly Contribution & Filing
              </h3>
              <p className="text-gray-600">
                We accurately calculate the monthly contributions for both the
                employer and employees, prepare the payment challan, and file
                the monthly returns on your behalf, ensuring you never miss a
                deadline.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-user-plus text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Employee Onboarding & Exiting
              </h3>
              <p className="text-gray-600">
                We manage the process of registering new employees under the
                schemes (UAN generation and linking) and handle the full and
                final settlement, including PF withdrawal or transfer
                assistance, for exiting employees.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-user-tie text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Compliance Advisory & Support
              </h3>
              <p className="text-gray-600">
                We keep you updated on any changes to labour laws and provide
                ongoing expert advice on your responsibilities as an employer.
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
              Find the Right Plan for{" "}
              <span className="text-yellow-600">Your Team's Size</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As your team grows, your compliance needs evolve. Our transparent,
              monthly subscription plans are designed to scale with you.
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
                  {pkg.price !== "Custom Pricing" ? (
                    <PublicBusinessServicePayment
                      serviceName="Labour Law Compliance"
                      packageData={{
                        id: pkg.id,
                        name: pkg.name,
                        price: pkg.price.replace('₹', '').replace(',', ''),
                        description: pkg.bestFor,
                        features: pkg.features
                      }}
                      buttonText={`Get Started - ${pkg.price}`}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        pkg.popular
                          ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                    />
                  ) : (
                    <button
                      onClick={() => {
                        const message = encodeURIComponent(
                          "Hi! I'm interested in Labour Law Compliance Services (PF & ESI). Could you please provide me with a free labour law consultation?"
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
                  )}
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
                Timely Filing & Accuracy Guarantee
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We understand the critical nature of payroll compliance. We
              guarantee that your monthly PF and ESI contributions will be
              calculated accurately based on the data provided, and that all
              returns will be filed on time. If any penalty arises due to a
              filing delay or calculation error on our part, we will cover that
              penalty.
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
              Our Simple{" "}
              <span className="text-yellow-600">3-Step Compliance Process</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Consultation & Registration
              </h3>
              <p className="text-gray-600">
                We start with a free consultation to assess your needs. If
                required, we handle the one-time PF/ESI registration for your
                company.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Monthly Payroll Data Share
              </h3>
              <p className="text-gray-600">
                Each month, you securely provide us with your employee
                attendance and salary data. That's all you need to do.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Calculation, Filing & Reporting
              </h3>
              <p className="text-gray-600">
                Our team calculates all contributions, deposits the challans,
                files the monthly returns, and provides you with a confirmation
                report for your records.
              </p>
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
                  "As we grew past 20 employees, we knew we needed an expert to
                  handle our PF and ESI. Kanoonwise has been fantastic. Their
                  'Growth Team' plan is perfect for us, and our dedicated
                  manager makes the process completely stress-free every month."
                </blockquote>
                <p className="text-yellow-400 font-semibold">
                  - HR Manager, a Growing IT Services Company
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Build Your Team with{" "}
                <span className="text-yellow-500">Confidence.</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Focus on hiring the best talent and building a great culture.
                Let us handle the complexities of labour law compliance.
              </p>
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi! I'm interested in Labour Law Compliance Services (PF & ESI). Could you please provide me with a free labour law consultation?"
                  );
                  window.open(
                    `https://wa.me/919876543210?text=${message}`,
                    "_blank"
                  );
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Ensure My Employer Compliance Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabourLawCompliance;
