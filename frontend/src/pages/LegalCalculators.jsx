import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const LegalCalculators = () => {
  const navigate = useNavigate();
  const [activeCalculator, setActiveCalculator] = useState("stamp-duty");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculators = [
    {
      id: "stamp-duty",
      title: "Stamp Duty Calculator",
      description:
        "Calculate stamp duty for property registration across Indian states",
      icon: "fas fa-home",
      image: "/calc-property.webp",
      fields: [
        { name: "propertyValue", label: "Property Value (₹)", type: "number" },
        {
          name: "state",
          label: "State",
          type: "select",
          options: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"],
        },
        {
          name: "propertyType",
          label: "Property Type",
          type: "select",
          options: ["Residential", "Commercial", "Agricultural"],
        },
      ],
    },
    {
      id: "emi-calculator",
      title: "Legal Fee EMI Calculator",
      description:
        "Calculate EMI for legal service payments and litigation costs",
      icon: "fas fa-calculator",
      image: "/calc-emi.png",
      fields: [
        { name: "amount", label: "Total Amount (₹)", type: "number" },
        { name: "tenure", label: "Tenure (Months)", type: "number" },
        { name: "interest", label: "Interest Rate (%)", type: "number" },
      ],
    },
    {
      id: "maintenance-calculator",
      title: "Maintenance Calculator",
      description:
        "Calculate maintenance amount for divorce and family law cases",
      icon: "fas fa-family",
      image: "/calc-maintenance.webp",
      fields: [
        { name: "income", label: "Monthly Income (₹)", type: "number" },
        { name: "expenses", label: "Monthly Expenses (₹)", type: "number" },
        { name: "dependents", label: "Number of Dependents", type: "number" },
      ],
    },
    {
      id: "gst-calculator",
      title: "GST Calculator",
      description:
        "Calculate GST amount for legal services and business transactions",
      icon: "fas fa-percentage",
      image: "/calc-gst.png",
      fields: [
        { name: "amount", label: "Base Amount (₹)", type: "number" },
        {
          name: "gstRate",
          label: "GST Rate (%)",
          type: "select",
          options: ["5", "12", "18", "28"],
        },
        {
          name: "type",
          label: "Calculation Type",
          type: "select",
          options: ["Exclusive", "Inclusive"],
        },
      ],
    },
  ];

  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateResult = () => {
    // Mock calculation - in real app, implement actual calculations
    const mockResults = {
      "stamp-duty": {
        result: "₹45,000",
        breakdown: "Stamp Duty: ₹40,000 + Registration Fee: ₹5,000",
      },
      "emi-calculator": {
        result: "₹8,500/month",
        breakdown: "Principal: ₹7,200 + Interest: ₹1,300",
      },
      "maintenance-calculator": {
        result: "₹25,000/month",
        breakdown: "Based on 25% of net income",
      },
      "gst-calculator": {
        result: "₹11,800",
        breakdown: "Base: ₹10,000 + GST (18%): ₹1,800",
      },
    };

    setResult(mockResults[activeCalculator]);
  };

  const currentCalculator = calculators.find(
    (calc) => calc.id === activeCalculator
  );

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
                <i className="fas fa-calculator text-yellow-400"></i>
                <span className="text-yellow-400 font-semibold">
                  Legal Calculators
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Legal Cost
                <span className="text-yellow-400"> Calculators</span>
                <br />
                <span className="text-orange-400">Plan Your Budget</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Calculate legal costs, fees, and financial obligations with our
                comprehensive legal calculators. Get accurate estimates for
                various legal services and procedures.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 border border-yellow-500/30">
                <img
                  src="/calculators-hero.jpg"
                  alt="Financial Calculator with Legal Documents and Charts"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">
                    Financial Planning Tools
                  </p>
                  <p className="text-sm opacity-90">
                    Calculate legal costs accurately
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-800">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Calculator Tabs */}
            <div className="lg:col-span-1">
              <div className="bg-gray-700 rounded-2xl p-6 border border-gray-600">
                <h3 className="text-lg font-bold text-white mb-6">
                  Select Calculator
                </h3>
                <div className="space-y-3">
                  {calculators.map((calculator) => (
                    <button
                      key={calculator.id}
                      onClick={() => {
                        setActiveCalculator(calculator.id);
                        setResult(null);
                        setFormData({});
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        activeCalculator === calculator.id
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "text-gray-300 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <i className={calculator.icon}></i>
                        <div>
                          <div className="font-semibold">
                            {calculator.title}
                          </div>
                          <div className="text-xs opacity-75">
                            {calculator.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-700 rounded-2xl p-6 border border-gray-600">
                <div className="flex items-center space-x-3 mb-6">
                  <i
                    className={`${currentCalculator.icon} text-yellow-400 text-2xl`}
                  ></i>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {currentCalculator.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {currentCalculator.description}
                    </p>
                  </div>
                </div>

                {/* Calculator Image */}
                <div className="h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-6 border border-yellow-500/30">
                  <div className="text-center text-yellow-400">
                    <i
                      className={`${currentCalculator.icon} text-3xl mb-2`}
                    ></i>
                    <p className="text-xs opacity-75">
                      {currentCalculator.image}
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {currentCalculator.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            handleInputChange(field.name, e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.name] || ""}
                          onChange={(e) =>
                            handleInputChange(field.name, e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          placeholder={`Enter ${field.label}`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={calculateResult}
                  className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all"
                >
                  <i className="fas fa-calculator mr-2"></i>
                  Calculate
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <div className="bg-gray-700 rounded-2xl p-6 border border-gray-600">
                <h3 className="text-lg font-bold text-white mb-6">
                  Calculation Result
                </h3>

                {result ? (
                  <div className="space-y-4">
                    <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">
                          {result.result}
                        </div>
                        <div className="text-sm text-gray-300">
                          {result.breakdown}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 bg-gray-600 rounded-lg p-3">
                      <i className="fas fa-info-circle mr-1"></i>
                      This is an estimate. Actual costs may vary. Consult with a
                      legal expert for accurate calculations.
                    </div>

                    <button
                      onClick={() => navigate("/quick-booking")}
                      className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm"
                    >
                      <i className="fas fa-phone mr-2"></i>
                      Consult Expert
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <i className="fas fa-calculator text-4xl mb-4 opacity-50"></i>
                    <p>Fill the form and click calculate to see results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LegalCalculators;
