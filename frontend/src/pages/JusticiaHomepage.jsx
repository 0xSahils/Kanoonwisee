import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Lottie from "lottie-react";
import KnowledgeBank from "../components/landing/KnowledgeBank";

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Search & Discover",
    description:
      "Browse through thousands of verified lawyers by city, specialization, experience, and ratings to find the perfect match for your legal needs.",
    animationPath: "/animations/search.json",
    alt: "Search and discover lawyers",
    fallbackIcon: "fa-search",
  },
  {
    step: 2,
    title: "Compare & Choose",
    description:
      "Review detailed profiles, client reviews, fee structures, and success rates. Make informed decisions with transparent information.",
    animationPath: "/animations/profile.json",
    alt: "Compare and choose lawyers",
    fallbackIcon: "fa-balance-scale",
  },
  {
    step: 3,
    title: "Book & Connect",
    description:
      "Schedule consultations instantly, manage appointments, and get expert legal advice from India's most trusted lawyers.",
    animationPath: "/animations/connect.json",
    alt: "Book consultation and connect with lawyers",
    fallbackIcon: "fa-handshake",
  },
];

const STATE_CITY_MAP = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Manipur: ["Imphal", "Churachandpur"],
  Meghalaya: ["Shillong", "Tura"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
  Sikkim: ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Tripura: ["Agartala", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Varanasi", "Delhi"],
  Uttarakhand: ["Dehradun", "Haridwar", "Haldwani"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
};

const JusticiaHomepage = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const citiesForSelectedState = selectedState
    ? STATE_CITY_MAP[selectedState] ?? []
    : [];
  const [animationDataMap, setAnimationDataMap] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load Lottie animations from public folder
  useEffect(() => {
    let isMounted = true;

    const loadAnimations = async () => {
      const animationEntries = await Promise.all(
        HOW_IT_WORKS_STEPS.map(async ({ animationPath }) => {
          try {
            const response = await fetch(animationPath);
            if (!response.ok) {
              throw new Error(
                `Failed to load ${animationPath}: ${response.status}`
              );
            }

            const jsonData = await response.json();
            return [animationPath, jsonData];
          } catch (error) {
            console.error("Error loading animation", error);
            return [animationPath, null];
          }
        })
      );

      if (isMounted) {
        setAnimationDataMap(Object.fromEntries(animationEntries));
      }
    };

    loadAnimations();

    return () => {
      isMounted = false;
    };
  }, []);

  const services = [
    {
      icon: "fas fa-rocket",
      title: "Business Setup",
      description: "Complete company registration and incorporation services.",
      link: "/business-setup",
    },
    {
      icon: "fas fa-trademark",
      title: "Trademark & IP",
      description: "Protect your intellectual property and brand assets.",
      link: "/trademark-ip",
    },
    {
      icon: "fas fa-laptop-code",
      title: "Tech Law",
      description: "Legal expertise for technology companies and startups.",
      link: "/search-lawyers?specialization=Tech%20Law",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Compliance Package",
      description: "Day-one compliance solutions for your business.",
      link: "/compliance-package",
    },
  ];

  useEffect(() => {
    if (!selectedState) {
      setSelectedCity("");
    }
  }, [selectedState]);

  // Search functionality
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) {
      params.append("city", selectedCity);
    }
    if (searchQuery) {
      params.append("specialization", searchQuery);
    }
    navigate(`/search-lawyers?${params.toString()}`);
  };

  const handleTagClick = (tag) => {
    navigate(`/search-lawyers?specialization=${encodeURIComponent(tag)}`);
  };

  const states = Object.keys(STATE_CITY_MAP);

  const popularSearches = [
    "Corporate Lawyer",
    "Family Lawyer",
    "Criminal Lawyer",
    "Property Lawyer",
    "Civil Lawyer",
    "Tax Lawyer",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[135vh] lg:h-[165h] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/supreme_background.webp"
            alt="Professional legal services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
        </div>

        <div className="relative md:my-0 my-28 z-10 flex items-center justify-center h-full pt-32">
          <div className="text-center max-w-5xl px-4">
            <div className="mb-12">
              <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
              <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                The Trusted Platform for{" "}
                <span className="text-yellow-500">Vetted Legal Experts</span> in
                India
              </h1>
              <p className="text-xl md:text-2xl font-light mb-4 text-gray-300">
                Connect with carefully selected lawyers who specialize in
                business, startup, and tech law
              </p>
              <p className="text-lg text-gray-400 mb-10">
                Every lawyer on our platform goes through our rigorous 3-step
                verification process
              </p>

              {/* Enhanced Search Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {/* State Selector */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-map-marker-alt text-yellow-500"></i>
                    </div>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="text-gray-900">
                        Select State
                      </option>
                      {states.map((state) => (
                        <option
                          key={state}
                          value={state}
                          className="text-gray-900"
                        >
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City Selector */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-city text-yellow-500"></i>
                    </div>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedState}
                      className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" className="text-gray-900">
                        {selectedState ? "Select City" : "Select State First"}
                      </option>
                      {citiesForSelectedState.map((city) => (
                        <option
                          key={city}
                          value={city}
                          className="text-gray-900"
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Input */}
                  <div className="relative md:col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-search text-yellow-500"></i>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for lawyers, legal services..."
                      className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 mb-6"
                >
                  <i className="fas fa-search mr-2"></i>
                  Find Vetted Legal Experts
                </button>

                {/* Popular Searches */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="text-gray-300 font-medium">Popular:</span>
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(search)}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 hover:border-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-200 text-sm font-medium"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                    15,000+
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    Verified Lawyers
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                    50,000+
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    Cases Resolved
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                    98%
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    Success Rate
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    Support
                  </div>
                </div>
              </div> */}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 mt-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <i className="fas fa-shield-check text-yellow-500"></i>
                <span className="text-sm">Verified Lawyers</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-lock text-yellow-500"></i>
                <span className="text-sm">100% Confidential</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-clock text-yellow-500"></i>
                <span className="text-sm">Quick Response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              How Kanoonwise Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with India's top lawyers in just 3 simple steps. Find,
              compare, and book consultations seamlessly.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map(
              ({
                step,
                title,
                description,
                animationPath,
                alt,
                fallbackIcon,
              }) => (
                <div key={step} className="text-center">
                  <div className="relative mx-auto mb-8 flex h-56 w-56 max-w-full items-center justify-center sm:h-64 sm:w-64">
                    <div className="absolute inset-0 -z-10 rounded-3xl bg-white shadow-xl shadow-gray-200/60" />
                    <div className="flex h-full w-full items-center justify-center rounded-3xl bg-white p-4">
                      {animationDataMap[animationPath] ? (
                        <Lottie
                          animationData={animationDataMap[animationPath]}
                          loop
                          className="h-full w-full"
                          title={alt}
                        />
                      ) : (
                        <i
                          className={`fas ${fallbackIcon} text-5xl text-yellow-500`}
                          aria-label={alt}
                        ></i>
                      )}
                    </div>
                    <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-gray-900 shadow-lg">
                      {step}
                    </div>
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">{description}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Business Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive business legal solutions for startups, tech
              companies, and growing businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${service.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <a
                    href={service.link}
                    className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-300"
                  >
                    Learn More
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8">
                <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                  A Message from Our{" "}
                  <span className="text-yellow-600">Founder</span>
                </h2>
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  "I started Kanoonwise with a simple mission: to connect
                  businesses and startups with the right legal experts who truly
                  understand their needs."
                </p>
                <p>
                  "After seeing countless entrepreneurs struggle to find
                  reliable legal counsel, I knew there had to be a better way.
                  That's why every lawyer on our platform goes through our
                  rigorous 3-step verification process."
                </p>
                <p>
                  "We're not just another legal marketplace - we're your trusted
                  partner in building a legally sound business foundation."
                </p>
                <div className="pt-4">
                  <p className="font-semibold text-gray-900">- Furquan Ali</p>
                  <p className="text-sm text-gray-600">
                    Founder & CEO, Kanoonwise
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    As Founder & CEO, Furquan Ali is a legal-domain expert and
                    technology entrepreneur. He is not a practicing advocate
                    and does not provide legal advice through Kanoonwise.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-72 h-80 md:w-96 md:h-96 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-yellow-200 shadow-lg"></div>
                </div>
                <img
                  src="/founder.jpg"
                  alt="Kanoonwise Founder"
                  className="relative w-72 h-80 md:w-96 md:h-96 object-cover rounded-2xl z-10"
                  style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-founder.png';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kanoonwise Verified Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              The <span className="text-yellow-600">Kanoonwise Verified™</span>{" "}
              Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every lawyer on our platform undergoes our rigorous 3-step
              verification process to ensure you get the highest quality legal
              expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Credential Verification
              </h3>
              <p className="text-gray-600">
                We verify bar registration, educational qualifications, and
                professional certifications.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Experience Assessment
              </h3>
              <p className="text-gray-600">
                We evaluate their track record, specialization expertise, and
                case success history.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 text-gray-900 rounded-full mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quality Interview
              </h3>
              <p className="text-gray-600">
                Our legal experts conduct in-depth interviews to assess
                communication skills and client focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Bank Section */}
      <KnowledgeBank />

      {/* Founder Spotlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Founder <span className="text-yellow-600">Spotlights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real success stories from founders who built their businesses with
              the right legal foundation through Kanoonwise.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src="/founder.jpg"
                  alt="Startup Founder"
                  className="w-16 h-16 rounded-full object-contain bg-white"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-founder.png';
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">
                    Founder, TechStart Solutions
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Kanoonwise connected me with a tech law expert who helped us
                navigate complex IP issues during our Series A. The lawyer
                understood our business model and provided strategic advice that
                saved us months of legal complications."
              </p>
              <div className="text-sm text-gray-600">
                <strong>Challenge:</strong> IP protection for AI technology
                <br />
                <strong>Solution:</strong> Comprehensive IP strategy and patent
                filing
                <br />
                <strong>Result:</strong> Successful Series A funding with
                protected IP
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src="/founder.jpg"
                  alt="Business Founder"
                  className="w-16 h-16 rounded-full object-contain bg-white"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-founder.png';
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Rajesh Patel</h4>
                  <p className="text-sm text-gray-600">
                    Founder, GreenTech Innovations
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The business setup service through Kanoonwise was exceptional.
                From company registration to compliance setup, everything was
                handled professionally. Our lawyer became a trusted advisor who
                still helps us with ongoing legal needs."
              </p>
              <div className="text-sm text-gray-600">
                <strong>Challenge:</strong> Complete business incorporation and
                compliance
                <br />
                <strong>Solution:</strong> End-to-end business setup package
                <br />
                <strong>Result:</strong> Fully compliant business ready for
                operations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white px-20">
        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl mb-6 sm:mb-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white">
                <i className="fas fa-balance-scale mr-2 sm:mr-3"></i>
                Are You a Legal Professional?
              </h3>
              <p className="text-orange-100 text-base sm:text-lg">
                Join India's largest network of advocates and expand your
                practice. Connect with clients nationwide and grow your legal
                career.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <button
                onClick={() => navigate("/join-as-lawyer")}
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-base sm:text-lg inline-flex items-center w-full sm:w-auto justify-center min-h-[44px]"
              >
                <i className="fas fa-balance-scale mr-2 sm:mr-3"></i>
                Join as Lawyer
                <i className="fas fa-arrow-right ml-2 sm:ml-3"></i>
              </button>
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-center lg:justify-end gap-3 sm:gap-6 text-orange-100">
                <div className="flex items-center justify-center space-x-2">
                  <i className="fas fa-check-circle text-green-300"></i>
                  <span className="text-xs sm:text-sm">Free Registration</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <i className="fas fa-check-circle text-green-300"></i>
                  <span className="text-xs sm:text-sm">Verified Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light mb-6">Contact Us</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get in touch with our legal experts for professional consultation
              and support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">
                About Kanoonwise
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Professional legal services with expertise across multiple
                practice areas. Committed to delivering justice and protecting
                your rights.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4 mt-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">
                Our Services
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    Corporate Law
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    Property Law
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    Family Law
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    Criminal Defense
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    Banking Law
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">
                Mumbai Office
              </h3>
              <div className="space-y-2 text-gray-400">
                <p>
                  Bandra Kurla Complex
                  <br />
                  Mumbai, Maharashtra
                </p>
                <p>
                  Tel:{" "}
                  <a
                    href="tel:+919876543210"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    +91 98765 43210
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@kanoonwise.com"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    info@kanoonwise.com
                  </a>
                </p>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">
                Delhi Office
              </h3>
              <div className="space-y-2 text-gray-400">
                <p>
                  Connaught Place
                  <br />
                  New Delhi, Delhi
                </p>
                <p>
                  Tel:{" "}
                  <a
                    href="tel:+919876543211"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    +91 98765 43211
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:delhi@kanoonwise.com"
                    className="hover:text-yellow-500 transition-colors duration-300"
                  >
                    delhi@kanoonwise.com
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div> */}
      </section>
      <Footer />
    </div>
  );
};

export default JusticiaHomepage;
