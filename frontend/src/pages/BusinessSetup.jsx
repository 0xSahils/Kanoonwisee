import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PublicBusinessServicePayment from "../components/payment/PublicBusinessServicePayment";

const BusinessSetup = () => {
  // const navigate = useNavigate();
  // const [selectedPackage, setSelectedPackage] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      id: "standard",
      name: "Standard",
      originalPrice: "₹2,999",
      price: "₹1,499",
      discount: "50% off",
      description:
        "Faster application submission with expert assistance in just 7 days.",
      features: [
        "Expert assisted process",
        "Your company name is filed in just 1 - 2 days*",
        "DSC in just 3 - 4 days",
        "SPICe+ form filing in 7 days*",
        "Incorporation Certificate in 14 - 21 days",
        "Company PAN+TAN",
        "DIN for directors",
        "Digital welcome kit that includes a checklist of all post-incorporation compliances",
      ],
      cashback: "Get ₹1000 cashback*",
      cashbackNote:
        "Unlock cashback benefits upon opening a current account with our partner banks. T&C",
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      originalPrice: "₹4,999",
      price: "₹2,499",
      discount: "50% off",
      description:
        "Complete business setup with additional compliance support.",
      features: [
        "Everything in Standard",
        "GST Registration included",
        "Professional Email Setup",
        "Digital Signature for 2 Directors",
        "Bank Account Opening Assistance",
        "Trademark Search Report",
        "1 Year Compliance Calendar",
        "Priority Customer Support",
      ],
      cashback: "Get ₹2000 cashback*",
      cashbackNote:
        "Unlock cashback benefits upon opening a current account with our partner banks. T&C",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      originalPrice: "₹7,999",
      price: "₹3,999",
      discount: "50% off",
      description:
        "Complete business setup with legal consultation and ongoing support.",
      features: [
        "Everything in Premium",
        "1 Hour Legal Consultation",
        "Shareholder Agreement Draft",
        "Employment Agreement Templates",
        "Privacy Policy & Terms of Service",
        "Dedicated Relationship Manager",
        "Quarterly Compliance Review",
        "24/7 Priority Support",
      ],
      cashback: "Get ₹3000 cashback*",
      cashbackNote:
        "Unlock cashback benefits upon opening a current account with our partner banks. T&C",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-primary-900 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 border border-yellow-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full">
                  <i className="fas fa-rocket text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  🚀 Launch Your Business
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Business
                  <span className="text-yellow-400"> Setup</span>
                  <br />
                  <span className="text-orange-400">Made Simple</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Complete company registration and incorporation services with
                  expert legal guidance. From Private Limited Company to LLP
                  registration - get your business legally established.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    1000+
                  </div>
                  <div className="text-sm text-gray-300">
                    Companies Registered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    7-14 Days
                  </div>
                  <div className="text-sm text-gray-300">Average Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    50% Off
                  </div>
                  <div className="text-sm text-gray-300">Limited Time</div>
                </div>
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Get Started Today
                </h3>
                <p className="text-gray-300">
                  Choose your business setup package and launch with confidence
                </p>
              </div>
              <button
                onClick={() =>
                  document
                    .getElementById("pricing-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                View Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Choose Your{" "}
              <span className="text-yellow-600">Business Setup Package</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect package for your business needs. All packages
              include expert assistance and government fee coverage.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular
                    ? "ring-2 ring-yellow-500 transform scale-105"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-semibold">
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

                    <div className="mb-4">
                      <span className="text-gray-500 line-through text-lg">
                        {pkg.originalPrice}
                      </span>
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        {pkg.discount}
                      </span>
                    </div>

                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {pkg.price}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      + Govt Fee (to be paid later)
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg mb-6">
                      <div className="flex items-center justify-center mb-1">
                        <i className="fas fa-gift text-blue-600 mr-2"></i>
                        <span className="font-semibold text-blue-800">
                          {pkg.cashback}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600">
                        {pkg.cashbackNote}
                      </p>
                    </div>
                  </div>

                                    {/* Public Business Service Payment Component */}
                  <div className="mb-6">
                    <PublicBusinessServicePayment
                      serviceName="Private Limited Company"
                      buttonText={`Get Started - ${pkg.price}`}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      What you'll get
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

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              <strong>Note:</strong> Approval is based on MCA review. We'll do
              our best to ensure smooth processing. T&C
            </p>
            <p className="text-sm text-gray-500">
              * Timeline may vary based on government processing and document
              submission
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              How It <span className="text-yellow-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 4-step process to get your business legally established
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Choose Package
              </h3>
              <p className="text-gray-600">
                Select the business setup package that fits your needs
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Submit Details
              </h3>
              <p className="text-gray-600">
                Provide company details and required documents via WhatsApp
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Expert Processing
              </h3>
              <p className="text-gray-600">
                Our legal experts handle all paperwork and government filings
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Business Ready
              </h3>
              <p className="text-gray-600">
                Receive incorporation certificate and start operations
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessSetup;
