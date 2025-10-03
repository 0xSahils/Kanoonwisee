import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const CopyrightServices = () => {
  // const navigate = useNavigate();
  // const [selectedPackage, setSelectedPackage] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "creator-basic",
      name: "Creator Basic",
      price: "₹4,999",
      description:
        "The essential first step to formally claim ownership of your work",
      features: [
        "Expert Consultation",
        "Application Drafting & Filing",
        "Filing for One Work",
        "Filing Accuracy Guarantee",
      ],
      popular: false,
      timeline: "3-4 months",
    },
    {
      id: "professional-shield",
      name: "Professional Shield",
      price: "₹9,999",
      description:
        "Our most popular plan, offering robust protection and expert handling of common hurdles",
      features: [
        "Everything in Creator Basic",
        "In-depth Legal Review of Your Work",
        "Response to Minor Objections",
        "Filing for up to 3 Works",
        "BONUS: Cease & Desist Notice Template",
      ],
      popular: true,
      timeline: "3-4 months",
    },
    {
      id: "enterprise-vault",
      name: "Enterprise Vault",
      price: "₹19,999",
      description:
        "The ultimate solution for businesses needing to secure and manage a portfolio of creative assets",
      features: [
        "Everything in Professional Shield",
        "Portfolio Management",
        "Bulk Filing Discounts",
        "Priority Processing",
        "Dedicated Account Manager",
        "Quarterly Portfolio Review",
      ],
      popular: false,
      timeline: "3-4 months",
    },
  ];

  // const handleGetStarted = (pkg) => {
  //   setSelectedPackage(pkg);
  //   const message = `Hi! I'm interested in the ${pkg.name} copyright package (${pkg.price}). Please help me protect my creative work.`;
  //   const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
  //     message
  //   )}`;
  //   window.open(whatsappUrl, "_blank");
  // };

  const whoWeProtect = [
    {
      title: "Software Developers",
      description:
        "We protect the thousands of lines of code, the unique architecture, and the expressive user interface that form the core of your digital product.",
      icon: "fas fa-code",
      examples: [
        "Source Code",
        "Software Architecture",
        "User Interface Design",
        "Algorithms",
      ],
    },
    {
      title: "Authors & Writers",
      description:
        "We safeguard the worlds you build and the stories you tell—from the first draft of your manuscript to the final published book, screenplay, or blog.",
      icon: "fas fa-pen-fancy",
      examples: [
        "Books & Manuscripts",
        "Screenplays",
        "Blogs & Articles",
        "Poetry & Lyrics",
      ],
    },
    {
      title: "Artists & Musicians",
      description:
        "We ensure the melody you composed, the lyrics you wrote, or the masterpiece you painted remains yours to control, perform, and profit from.",
      icon: "fas fa-music",
      examples: [
        "Songs & Compositions",
        "Artwork & Paintings",
        "Photography",
        "Digital Art",
      ],
    },
    {
      title: "Businesses & Brands",
      description:
        "We protect the valuable content you create daily, including your website's text and design, marketing brochures, training manuals, and product catalogs.",
      icon: "fas fa-briefcase",
      examples: [
        "Website Content",
        "Marketing Materials",
        "Training Manuals",
        "Product Catalogs",
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Consultation & Document Submission",
      description:
        "The journey begins with a brief consultation to understand your creative work. You will then securely upload a digital copy of your work along with the necessary details of authorship and publication.",
    },
    {
      step: 2,
      title: "Drafting & Filing",
      description:
        "Our team meticulously drafts the copyright application, ensuring all details are accurate, and files it with the Indian Copyright Office. We will share the official diary number with you, which serves as your proof of filing.",
    },
    {
      step: 3,
      title: "Examination & Registration",
      description:
        "Your application enters a mandatory 30-day waiting period where it is open for third-party objections. We monitor this for you. Afterward, a government examiner reviews the application. Once cleared, the registration is approved, and the official e-certificate is issued, securing your rights for a lifetime.",
    },
  ];

  const whyRegister = [
    {
      title: "📜 Establishes Undeniable Legal Proof of Ownership",
      description:
        "A copyright registration certificate is your ultimate trump card in any ownership dispute. It serves as prima facie evidence in a court of law, shifting the burden of proof from you to the infringer.",
    },
    {
      title: "⚖️ Unlocks Your Right to Sue for Infringement",
      description:
        "In India, you cannot file a lawsuit for copyright infringement without a registration certificate. This simple document unlocks the courthouse doors, giving you the legal standing to demand that infringers stop their unauthorized use and pay for damages.",
    },
    {
      title: "🌐 Creates a Public, Deterrent Record of Ownership",
      description:
        "Registration puts your ownership on the public record for the entire world to see. This acts as a powerful deterrent, warning potential infringers that you are a serious creator who has formally protected their work.",
    },
    {
      title: "💰 Monetize Your Work with Confidence",
      description:
        "A registered copyright is a clean, transferable asset. It is the foundation for all commercial activities, including selling your work, securing publishing deals, or entering into licensing agreements for your software, music, or art.",
    },
  ];

  const faqs = [
    {
      question: "Is copyright registration mandatory?",
      answer:
        "While you automatically have a copyright upon creation, registration is not mandatory to claim ownership. However, it is mandatory for enforcement. Without a registration certificate, you cannot file a lawsuit to stop someone from infringing on your work, making your rights effectively unenforceable.",
    },
    {
      question: "How long does a copyright last in India?",
      answer:
        "Copyright protection is exceptionally long. For most works, it lasts for the entire lifetime of the creator plus an additional 60 years. This means your work can be a protected asset for your heirs.",
    },
    {
      question:
        "What's the difference between Trademark and Copyright for a logo?",
      answer:
        "Think of it this way: Trademark protects your logo's function as a brand identifier in your specific industry. Copyright protects your logo's form as a piece of art against unauthorized reproduction in any context. For a creative logo, securing both is the strongest form of protection.",
    },
    {
      question: "Can I register multiple works under one application?",
      answer:
        "Yes, you can register multiple related works under a single application if they are part of a series or collection. This is often more cost-effective than filing separate applications for each work.",
    },
    {
      question: "What types of files can I submit for registration?",
      answer:
        "You can submit various digital formats including PDFs for written works, MP3s for music, ZIP files for source code, and image files for artwork. We'll guide you on the best format for your specific type of work.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 rounded-full px-4 py-2 border border-purple-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-purple-500 rounded-full">
                  <i className="fas fa-copyright text-white text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-purple-400">
                  🎨 Copyright Protection
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Own Your Original Work.
                  <br />
                  <span className="text-purple-400">
                    From Creation to Legacy.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  You've poured in the late nights, the spark of inspiration,
                  and the countless revisions. Now, it's time to protect it. We
                  transform your intangible effort—your code, your story, your
                  music, your art—into a powerful, defensible legal asset,
                  ensuring your creative legacy is yours and yours alone.
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
                  className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Your Free Copyright Consultation
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("why-copyright-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Creative Examples */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  What We Protect
                </h3>
                <p className="text-gray-300 mb-6">
                  Your creative work deserves legal protection
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-code text-purple-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">
                    Software
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-book text-purple-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">Books</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-music text-purple-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">Music</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 text-center">
                  <i className="fas fa-paint-brush text-purple-400 text-2xl mb-2"></i>
                  <div className="text-sm text-white font-semibold">Art</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Copyright Section */}
      <section id="why-copyright-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Why Registration is the Official{" "}
              <span className="text-purple-600">
                Deed to Your Creative Property
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While the copyright to your work technically exists the moment you
              create it, this "unregistered" right is weak and difficult to
              prove. Official registration with the Copyright Office is what
              forges that raw creativity into a powerful legal shield.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyRegister.map((item, index) => (
              <div
                key={index}
                className="bg-purple-50 rounded-lg p-6 border border-purple-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Protect Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Specialized Copyright Solutions for{" "}
              <span className="text-purple-600">Every Creator</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that different creative fields have unique needs. We
              provide tailored protection for:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whoWeProtect.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mr-4">
                    <i className={`${item.icon} text-purple-600 text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((example, exampleIndex) => (
                    <span
                      key={exampleIndex}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Choose Your Copyright{" "}
              <span className="text-purple-600">Protection Plan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our packages are designed to provide a clear and effective path to
              securing your creative works. All prices are for our professional
              fees and are exclusive of government fees.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  pkg.popular
                    ? "ring-2 ring-purple-500 transform scale-105 border-purple-200"
                    : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
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

                    <div className="bg-purple-50 p-3 rounded-lg mb-6">
                      <div className="flex items-center justify-center">
                        <i className="fas fa-clock text-purple-600 mr-2"></i>
                        <span className="font-semibold text-purple-800">
                          Timeline: {pkg.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Public Business Service Payment Component */}
                  <div className="mb-6">
                    <PublicBusinessServicePayment
                      serviceName="Copyright Registration"
                      packageData={{
                        id: pkg.id,
                        name: pkg.name,
                        price: pkg.price.replace('₹', '').replace(',', ''),
                        description: pkg.description,
                        features: pkg.features
                      }}
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

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our Simple 3-Step Path to{" "}
              <span className="text-purple-600">Protection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've refined the registration process to be transparent and
              straightforward.
            </p>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-full font-bold text-lg">
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
              <span className="text-purple-600">Questions</span>
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
      <section className="py-20 bg-gradient-to-r from-gray-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don't Let Your Hard Work Go Unprotected.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Your creativity is valuable. Ensure it's legally protected so you
            can share it with the world on your own terms.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("packages-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Secure Your Creative Work Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CopyrightServices;
