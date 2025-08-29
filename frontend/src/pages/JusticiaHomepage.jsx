import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import KnowledgeBank from "../components/landing/KnowledgeBank";

const JusticiaHomepage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroSlides = [
    {
      title: "Client Focused",
      subtitle: "The best law practices & services for all your legal needs.",
      description: "Professional legal consultation at your fingertips",
    },
    {
      title: "Law Expertise",
      subtitle: "The best law practices & services for all your legal needs.",
      description: "Expert lawyers ready to help with your legal matters",
    },
    {
      title: "Justice Oriented",
      subtitle: "The best law practices & services for all your legal needs.",
      description: "Committed to delivering justice and protecting your rights",
    },
  ];

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

  const testimonials = [
    {
      name: "Rajesh Kumar",
      text: "Kanoonwise helped me find the perfect property lawyer in Mumbai. The platform is amazing and all lawyers are verified!",
      image: "/client profile 1.png",
    },
    {
      name: "Priya Sharma",
      text: "Found an excellent corporate lawyer through Kanoonwise. Easy booking, transparent fees, highly recommend this platform!",
      image: "/client profile 2.png",
    },
    {
      name: "Amit Patel",
      text: "Best legal platform in India! Quick response, verified lawyers, and seamless consultation booking. Great experience!",
      image: "/client profile 3.png",
    },
  ];

  const expertise = [
    {
      title: "Banking Law",
      category: "Financial Services",
      image: "/banking law.png",
    },
    {
      title: "Health Law",
      category: "Medical Legal",
      image: "/health law.png",
    },
    {
      title: "Real Estate Law",
      category: "Property & Transactions",
      image: "/real estate law.png",
    },
    {
      title: "Corporate Law",
      category: "Business Legal",
      image: "/corporate law.jpg",
    },
    {
      title: "Family Law",
      category: "Personal Legal",
      image: "/family law.png",
    },
    {
      title: "Criminal Law",
      category: "Criminal Defense",
      image: "/criminal law.png",
    },
  ];

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Search functionality
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append("city", selectedCity);
    if (searchQuery) params.append("specialization", searchQuery);
    navigate(`/search-lawyers?${params.toString()}`);
  };

  const handleTagClick = (tag) => {
    navigate(`/search-lawyers?specialization=${encodeURIComponent(tag)}`);
  };

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
  ];

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
      <section className="relative h-[140vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/hero.jpg"
            alt="Professional legal services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full pt-32">
          <div className="text-center max-w-5xl px-4">
            <div className="mb-12">
              <div className="inline-block w-16 h-1 bg-yellow-500 mb-6"></div>
              <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
                The Trusted Platform for{" "}
                <span className="text-yellow-500">Vetted Legal Experts</span> in India
              </h1>
              <p className="text-xl md:text-2xl font-light mb-4 text-gray-300">
                Connect with carefully selected lawyers who specialize in business, startup, and tech law
              </p>
              <p className="text-lg text-gray-400 mb-10">
                Every lawyer on our platform goes through our rigorous 3-step verification process
              </p>

              {/* Enhanced Search Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {/* City Selector */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-map-marker-alt text-yellow-500"></i>
                    </div>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="" className="text-gray-900">
                        Select State
                      </option>
                      {cities.map((city, index) => (
                        <option
                          key={index}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
              </div>
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

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/search discover.png"
                    alt="Search and discover lawyers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-gray-900 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Search & Discover
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through thousands of verified lawyers by city,
                specialization, experience, and ratings to find the perfect
                match for your legal needs.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/compare choose.png"
                    alt="Compare and choose lawyers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-gray-900 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Compare & Choose
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Review detailed profiles, client reviews, fee structures, and
                success rates. Make informed decisions with transparent
                information.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/book connect.png"
                    alt="Book consultation and connect with lawyers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-yellow-500 text-gray-900 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Book & Connect
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Schedule consultations instantly, manage appointments, and get
                expert legal advice from India's most trusted lawyers.
              </p>
            </div>
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
              Comprehensive business legal solutions for startups, tech companies, and growing businesses.
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
                  "I started Kanoonwise with a simple mission: to connect businesses and startups with the right legal experts who truly understand their needs."
                </p>
                <p>
                  "After seeing countless entrepreneurs struggle to find reliable legal counsel, I knew there had to be a better way. That's why every lawyer on our platform goes through our rigorous 3-step verification process."
                </p>
                <p>
                  "We're not just another legal marketplace - we're your trusted partner in building a legally sound business foundation."
                </p>
                <div className="pt-4">
                  <p className="font-semibold text-gray-900">- [Founder Name]</p>
                  <p className="text-sm text-gray-600">Founder & CEO, Kanoonwise</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-8">
                <img
                  src="/founder-photo.jpg"
                  alt="Kanoonwise Founder"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
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
              The <span className="text-yellow-600">Kanoonwise Verified™</span> Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every lawyer on our platform undergoes our rigorous 3-step verification process to ensure you get the highest quality legal expertise.
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
                We verify bar registration, educational qualifications, and professional certifications.
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
                We evaluate their track record, specialization expertise, and case success history.
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
                Our legal experts conduct in-depth interviews to assess communication skills and client focus.
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
              Real success stories from founders who built their businesses with the right legal foundation through Kanoonwise.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src="/founder-spotlight-1.jpg"
                  alt="Startup Founder"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Founder, TechStart Solutions</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Kanoonwise connected me with a tech law expert who helped us navigate complex IP issues during our Series A. The lawyer understood our business model and provided strategic advice that saved us months of legal complications."
              </p>
              <div className="text-sm text-gray-600">
                <strong>Challenge:</strong> IP protection for AI technology<br/>
                <strong>Solution:</strong> Comprehensive IP strategy and patent filing<br/>
                <strong>Result:</strong> Successful Series A funding with protected IP
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src="/founder-spotlight-2.jpg"
                  alt="Business Founder"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Rajesh Patel</h4>
                  <p className="text-sm text-gray-600">Founder, GreenTech Innovations</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The business setup service through Kanoonwise was exceptional. From company registration to compliance setup, everything was handled professionally. Our lawyer became a trusted advisor who still helps us with ongoing legal needs."
              </p>
              <div className="text-sm text-gray-600">
                <strong>Challenge:</strong> Complete business incorporation and compliance<br/>
                <strong>Solution:</strong> End-to-end business setup package<br/>
                <strong>Result:</strong> Fully compliant business ready for operations
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
                Join as Advocate
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
        <div className="max-w-7xl mx-auto px-4">
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

          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Kanoonwise. All rights reserved. | Professional Legal
              Services
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JusticiaHomepage;
