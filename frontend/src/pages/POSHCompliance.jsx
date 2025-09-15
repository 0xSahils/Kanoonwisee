import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";

const POSHCompliance = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packageFeatures = [
    "Custom POSH Policy Drafting",
    "Internal Committee (IC) Constitution Assistance",
    "Virtual Employee Awareness Training",
    "Specialized IC Member Training",
    "Annual Report Filing Assistance",
  ];

  const faqs = [
    {
      question: "Who is required to comply with the POSH Act?",
      answer:
        "Every employer of a workplace with 10 or more employees (including full-time, part-time, interns, and contractors) is legally required to comply with the provisions of the POSH Act.",
    },
    {
      question: "What is the Internal Committee (IC) and who should be on it?",
      answer:
        "The IC is a mandatory internal body that receives and addresses complaints of sexual harassment. It must be headed by a senior female employee, have at least two other employees, and one external member who is familiar with social work or law.",
    },
    {
      question: "Is the employee training really mandatory?",
      answer:
        "Yes. The Act mandates that employers must conduct regular awareness programs to sensitize employees about the provisions of the POSH law. This is a critical part of compliance.",
    },
    {
      question: "What is the POSH Annual Report?",
      answer:
        "The IC is required to prepare an annual report detailing the number of cases filed and disposed of during the year. This report is then submitted by the employer to the District Officer.",
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
            alt="POSH Compliance Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Create a Safe and{" "}
              <span className="text-yellow-500">Respectful Workplace.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 leading-relaxed">
              Compliance with the POSH (Prevention of Sexual Harassment) Act,
              2013 is a non-negotiable legal mandate for any business with 10 or
              more employees. We provide an end-to-end solution to make your
              workplace safe, respectful, and fully compliant.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi! I'm interested in POSH Compliance Services. Could you please help me make my workplace POSH compliant?"
                );
                window.open(
                  `https://wa.me/919876543210?text=${message}`,
                  "_blank"
                );
              }}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Make My Workplace POSH Compliant
            </button>
          </div>
        </div>
      </section>

      {/* Why POSH Compliance is a Non-Negotiable Mandate Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Fostering a Culture of{" "}
              <span className="text-yellow-600">Safety and Respect</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              POSH compliance is far more than a legal checkbox; it's a
              fundamental commitment to your employees' well-being and a
              cornerstone of a healthy, productive, and modern corporate
              culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                It's the Law
              </h3>
              <p className="text-gray-600">
                Every company in India with 10 or more employees is legally
                required to implement the POSH Act. Non-compliance can lead to
                significant fines of up to ₹50,000, cancellation of the business
                license for repeat offenses, and personal liability for
                directors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Protects Your Employees
              </h3>
              <p className="text-gray-600">
                It provides a safe, confidential, and systematic mechanism for
                employees to report incidents of harassment. This ensures their
                concerns are addressed fairly by a properly constituted Internal
                Committee (IC).
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Reduces Corporate Risk
              </h3>
              <p className="text-gray-600">
                A well-implemented POSH policy and trained IC significantly
                protect the company from legal liability and severe reputational
                damage that can arise from workplace harassment incidents.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Boosts Employee Morale & Productivity
              </h3>
              <p className="text-gray-600">
                A workplace that transparently prioritizes safety fosters a
                culture of trust and respect. This leads to higher employee
                morale, better productivity, and becomes a key factor in
                attracting and retaining top talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our End-to-End POSH Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              A Complete Solution for{" "}
              <span className="text-yellow-600">Full Compliance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a single, comprehensive package to handle all aspects
              of your POSH compliance, taking the guesswork and complexity out
              of the process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-file-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Custom POSH Policy Drafting
              </h3>
              <p className="text-gray-600">
                We don't use generic templates. We draft a customized, legally
                robust POSH policy that is tailored to your company's specific
                industry, culture, and structure.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Internal Committee (IC) Constitution
              </h3>
              <p className="text-gray-600">
                We provide complete guidance on forming your mandatory Internal
                Committee, including the criteria for appointing an external
                member, ensuring its composition is fully compliant with the
                Act.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-graduation-cap text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Engaging Employee Training
              </h3>
              <p className="text-gray-600">
                We conduct an engaging virtual awareness training workshop for
                all your employees, educating them on their rights,
                responsibilities, and the definition of a respectful workplace.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-user-tie text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Specialized IC Member Training
              </h3>
              <p className="text-gray-600">
                Your IC members have a quasi-judicial role. We conduct a
                separate, specialized training session for them, focusing on
                their specific duties, investigation procedures, and report
                writing.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Annual Report Filing Assistance
              </h3>
              <p className="text-gray-600">
                We assist you in preparing and guide you on filing the mandatory
                POSH Annual Report with the relevant government authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package & Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              The Complete{" "}
              <span className="text-yellow-600">POSH Compliance Package</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our all-inclusive package is designed to make your business fully
              compliant in one simple, transparent step.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-yellow-500">
              <div className="bg-yellow-500 text-gray-900 text-center py-2 rounded-t-xl font-semibold">
                Complete Solution
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Complete POSH Compliance
                </h3>
                <p className="text-gray-600 mb-6">
                  Any business with 10 or more employees seeking an end-to-end,
                  expert-led compliance solution.
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹14,999
                  </span>
                  <span className="text-gray-600 ml-2">(One-Time)</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {packageFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-yellow-500 mt-1 mr-3"></i>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    const message = encodeURIComponent(
                      "Hi! I'm interested in POSH Compliance Services. Could you please help me make my workplace POSH compliant?"
                    );
                    window.open(
                      `https://wa.me/919876543210?text=${message}`,
                      "_blank"
                    );
                  }}
                  className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                >
                  Get Started
                </button>
              </div>
            </div>
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
              <span className="text-yellow-600">
                3-Step Path to a Compliant Workplace
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Consultation & Policy Drafting
              </h3>
              <p className="text-gray-600">
                We start with a consultation to understand your company
                structure. Our legal experts then draft your custom POSH policy
                and guide you on forming your Internal Committee.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Training & Sensitization
              </h3>
              <p className="text-gray-600">
                We schedule and conduct the two separate virtual training
                sessions—one for all your employees and a detailed one for your
                newly formed IC members.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Reporting & Finalization
              </h3>
              <p className="text-gray-600">
                We provide you with all the finalized documents, training
                records, and assist you in preparing the Annual Report,
                completing your compliance cycle.
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
                  "Implementing POSH compliance seemed daunting, but Kanoonwise
                  made it incredibly straightforward. Their package covered
                  everything from the policy to the employee training, which was
                  very well-received by our team. We now feel confident that we
                  have a safe and compliant workplace."
                </blockquote>
                <p className="text-yellow-400 font-semibold">
                  - Founder & CEO, a Marketing Agency
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Build a Workplace That is{" "}
                <span className="text-yellow-500">
                  Safe, Respectful, and Compliant.
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Take the definitive step to protect your employees and your
                business.
              </p>
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi! I'm interested in POSH Compliance Services. Could you please help me make my workplace POSH compliant?"
                  );
                  window.open(
                    `https://wa.me/919876543210?text=${message}`,
                    "_blank"
                  );
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Schedule Your POSH Consultation Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default POSHCompliance;
