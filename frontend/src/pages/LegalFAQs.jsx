import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const LegalFAQs = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", name: "All FAQs", icon: "fas fa-list" },
    { id: "criminal", name: "Criminal Law", icon: "fas fa-gavel" },
    { id: "civil", name: "Civil Law", icon: "fas fa-balance-scale" },
    { id: "family", name: "Family Law", icon: "fas fa-home" },
    { id: "property", name: "Property Law", icon: "fas fa-landmark" },
    { id: "corporate", name: "Corporate Law", icon: "fas fa-building" },
    { id: "general", name: "General Legal", icon: "fas fa-question-circle" },
  ];

  const faqs = [
    {
      id: 1,
      question: "What is the procedure for filing an FIR in India?",
      answer:
        "An FIR (First Information Report) can be filed at any police station. You can file it orally or in writing. The police officer is bound to register the FIR if it relates to a cognizable offense. You have the right to get a copy of the FIR free of cost.",
      category: "criminal",
      tags: ["FIR", "Police", "Criminal Procedure"],
    },
    {
      id: 2,
      question: "How long does property registration take in India?",
      answer:
        "Property registration typically takes 7-15 days depending on the state. You need to pay stamp duty and registration fees. Required documents include sale deed, NOC from society, property tax receipts, and identity proofs of both parties.",
      category: "property",
      tags: ["Property Registration", "Stamp Duty", "Real Estate"],
    },
    {
      id: 3,
      question: "What are the grounds for divorce under Hindu Marriage Act?",
      answer:
        "Grounds for divorce include adultery, cruelty, desertion for 2+ years, conversion to another religion, mental disorder, communicable disease, and renunciation of the world. Mutual consent divorce is also available.",
      category: "family",
      tags: ["Divorce", "Hindu Marriage Act", "Family Law"],
    },
    {
      id: 4,
      question: "How to register a Private Limited Company in India?",
      answer:
        "Company registration involves: 1) Digital Signature Certificate, 2) Director Identification Number, 3) Name reservation, 4) Filing incorporation documents, 5) Certificate of Incorporation. The process takes 10-15 days.",
      category: "corporate",
      tags: ["Company Registration", "Private Limited", "ROC"],
    },
    {
      id: 5,
      question: "What is the limitation period for filing a civil suit?",
      answer:
        "Generally, civil suits must be filed within 3 years from the date when the right to sue accrues. However, specific limitation periods vary: contracts (3 years), property disputes (12 years), tort claims (3 years).",
      category: "civil",
      tags: ["Limitation Period", "Civil Suit", "Time Limit"],
    },
    {
      id: 6,
      question: "Can I represent myself in court without a lawyer?",
      answer:
        'Yes, you have the right to represent yourself in court (called "party-in-person"). However, it\'s advisable to have legal representation for complex matters. You must follow court procedures and rules of evidence.',
      category: "general",
      tags: ["Self Representation", "Court Procedure", "Legal Rights"],
    },
    {
      id: 7,
      question: "What is the process for bail application in criminal cases?",
      answer:
        "Bail can be applied at police station (for bailable offenses), magistrate court, or high court. For non-bailable offenses, court discretion applies. Factors considered: nature of offense, flight risk, evidence tampering possibility.",
      category: "criminal",
      tags: ["Bail", "Criminal Law", "Court Procedure"],
    },
    {
      id: 8,
      question: "How to get legal heir certificate in India?",
      answer:
        "Apply to local tehsildar/revenue officer with death certificate, family tree, affidavit, and identity proofs. Process takes 15-30 days. Required for claiming insurance, bank accounts, and property of deceased person.",
      category: "family",
      tags: ["Legal Heir Certificate", "Succession", "Death Certificate"],
    },
  ];

  const filteredFAQs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative navbar-spacing-simple pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 mb-6">
                <i className="fas fa-question-circle text-yellow-400"></i>
                <span className="text-yellow-400 font-semibold">
                  Legal FAQs
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Frequently Asked
                <span className="text-yellow-400"> Legal Questions</span>
                <br />
                <span className="text-orange-400">Get Answers</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Find answers to common legal questions across various practice
                areas. Get clarity on legal procedures, rights, and obligations
                under Indian law.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all">
                  <i className="fas fa-search mr-2"></i>
                  Search FAQs
                </button>
                <button
                  onClick={() => navigate("/quick-booking")}
                  className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition-all"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Ask Expert
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 border border-yellow-500/30">
                <img
                  src="/faqs-hero.png"
                  alt="Person Reading Legal Books with Question Marks"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">Legal Knowledge Base</p>
                  <p className="text-sm opacity-90">
                    Get answers to legal questions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-800">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-gray-700 rounded-2xl p-6 border border-gray-600 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6">
                  Browse by Category
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        selectedCategory === category.id
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "text-gray-300 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      <i className={category.icon}></i>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQs List */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">
                  {selectedCategory === "all"
                    ? "All FAQs"
                    : categories.find((cat) => cat.id === selectedCategory)
                        ?.name}
                </h2>
                <span className="text-gray-400">
                  {filteredFAQs.length} questions
                </span>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-gray-700 rounded-xl border border-gray-600 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-6 hover:bg-gray-600 transition-all flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {faq.question}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium border border-yellow-500/30">
                            {
                              categories.find((cat) => cat.id === faq.category)
                                ?.name
                            }
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <i
                        className={`fas fa-chevron-${
                          openFAQ === faq.id ? "up" : "down"
                        } text-yellow-400 ml-4`}
                      ></i>
                    </button>

                    {openFAQ === faq.id && (
                      <div className="px-6 pb-6 border-t border-gray-600">
                        <div className="pt-4">
                          <p className="text-gray-300 leading-relaxed mb-4">
                            {faq.answer}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {faq.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={() => navigate("/quick-booking")}
                              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                            >
                              <i className="fas fa-phone mr-1"></i>
                              Need more help?
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-900">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-500/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our expert legal team is
              here to help with personalized advice for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/quick-booking")}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all"
              >
                <i className="fas fa-phone mr-2"></i>
                Consult Expert
              </button>
              <button
                onClick={() => navigate("/articles")}
                className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition-all"
              >
                <i className="fas fa-book mr-2"></i>
                Read Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LegalFAQs;
