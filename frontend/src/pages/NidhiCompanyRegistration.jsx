import React, { useEffect, useState } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const NidhiCompanyRegistration = () => {
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConsultationRequest = () => {
    setShowConsultationModal(true);
  };

  const handleWhatsAppConsultation = () => {
    const message = `Hi! I'm interested in Nidhi Company Registration. Can you provide me with detailed consultation and pricing information?`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setShowConsultationModal(false);
  };

  const benefits = [
    {
      icon: "fas fa-piggy-bank",
      title: "Encourages Savings",
      description: "Members are motivated to develop a habit of saving",
    },
    {
      icon: "fas fa-hand-holding-usd",
      title: "Easy Access to Loans",
      description: "Members can borrow at reasonable interest rates",
    },
    {
      icon: "fas fa-certificate",
      title: "Legal Recognition",
      description:
        "Registered under the Companies Act, giving credibility to your operations",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Low Risk",
      description:
        "Loans are given only to members, reducing chances of default",
    },
    {
      icon: "fas fa-handshake",
      title: "Better Trust",
      description: "Functions on principles of mutual benefit and cooperation",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Apply for DSC & DIN",
      description:
        "Digital Signature Certificates and Director Identification Numbers for all directors",
    },
    {
      step: "2",
      title: "Reserve Company Name",
      description: "Reserve the company name with MCA",
    },
    {
      step: "3",
      title: "File Incorporation Documents",
      description: "Draft and file incorporation documents (MoA, AoA)",
    },
    {
      step: "4",
      title: "Obtain Certificate",
      description: "Obtain Certificate of Incorporation from MCA",
    },
    {
      step: "5",
      title: "Complete Setup",
      description: "Apply for PAN, TAN, and open a bank account",
    },
    {
      step: "6",
      title: "Post-Incorporation Compliance",
      description:
        "Meet post-incorporation compliance requirements under Nidhi Rules",
    },
  ];

  const documents = [
    "PAN and Aadhaar of directors and shareholders",
    "Passport-size photographs",
    "Proof of registered office (utility bill or rent agreement + NOC from landlord)",
    "Identity and address proof of all directors (Passport, Voter ID, or Driving License)",
    "MoA and AoA details prepared during incorporation",
  ];

  const complianceRequirements = [
    "Minimum of 200 members within 12 months",
    "Minimum Net Owned Fund (NOF) of ₹10 lakh",
    "Maintain unencumbered deposits of at least 10% of outstanding deposits",
    "File annual returns and financial statements with MCA",
    "Ensure adherence to restrictions on business activities",
  ];

  const faqs = [
    {
      question:
        "What is the minimum capital requirement to start a Nidhi Company?",
      answer: "₹10 lakh is required as paid-up equity capital.",
    },
    {
      question: "Can a Nidhi Company lend to outsiders?",
      answer:
        "No. Nidhi Companies can only lend to and accept deposits from their members.",
    },
    {
      question: "How many members are needed?",
      answer:
        "At least 7 members are required at incorporation, and 200 members within one year.",
    },
    {
      question: "Is RBI approval required?",
      answer: "No. Nidhi Companies are regulated by MCA, not RBI.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center bg-accent-500/20 text-accent-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i className="fas fa-university mr-2"></i>
                NBFC for Community Finance
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Nidhi Company Registration
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                If your vision is to encourage savings and provide loans within
                a close-knit community, a Nidhi Company is the right choice.
                Recognized under Section 406 of the Companies Act, 2013.
              </p>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3"></i>
                  <span>Expert guidance on compliance</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3"></i>
                  <span>End-to-end assistance</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3"></i>
                  <span>Affordable pricing</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-accent-400 mr-3"></i>
                  <span>Post-registration support</span>
                </div>
              </div>
            </div>

            {/* Right Content - Consultation Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-accent-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">
                  Expert Consultation Required
                </h3>
                <p className="text-gray-600">
                  Nidhi Company registration involves complex compliance
                  requirements. Get personalized consultation and pricing based
                  on your specific needs.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span className="text-gray-700">
                    Detailed compliance guidance
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span className="text-gray-700">
                    Customized pricing structure
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span className="text-gray-700">
                    Timeline: 15-20 working days
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span className="text-gray-700">
                    Post-registration compliance support
                  </span>
                </div>
              </div>

              <button
                onClick={handleConsultationRequest}
                className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Benefits of a Nidhi Company
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why Nidhi Companies are perfect for community-based
              financial services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-accent-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${benefit.icon} text-accent-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Nidhi Company Registration Process
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures smooth registration and compliance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-accent-500 text-primary-900 rounded-full flex items-center justify-center mb-4 font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-primary-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                Get Expert Consultation
              </h3>
              <p className="text-gray-600">
                Connect with our Nidhi Company registration experts for
                personalized guidance and pricing.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleWhatsAppConsultation}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                WhatsApp Consultation
              </button>
              <button
                onClick={() => setShowConsultationModal(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents and Compliance */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Documents Required */}
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-6">
                Documents Required
              </h2>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-start">
                    <i className="fas fa-file-alt text-accent-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Post-Registration Compliance */}
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-6">
                Post-Registration Compliance
              </h2>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-600 mb-4">
                  After incorporation, a Nidhi Company must follow specific
                  rules to remain compliant:
                </p>
                <ul className="space-y-3">
                  {complianceRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Register */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Who Should Register a Nidhi Company?
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">
                Entrepreneurs
              </h3>
              <p className="text-gray-600">
                Looking to start a mutual benefit finance company
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-home text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">
                Communities
              </h3>
              <p className="text-gray-600">
                Aiming to promote savings and borrowing among members
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-accent-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">
                Groups
              </h3>
              <p className="text-gray-600">
                That want a safe, legally recognized model for lending and
                borrowing within a closed circle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Register Your Nidhi Company?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Turn your community vision into a trusted financial institution.
          </p>
          <p className="text-lg text-blue-200 mb-8">
            With Kanoonwise.com, you'll have expert support from registration to
            compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleConsultationRequest}
              className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Start Nidhi Company Registration
            </button>
            <button
              onClick={handleWhatsAppConsultation}
              className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Talk to Our Experts
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NidhiCompanyRegistration;
