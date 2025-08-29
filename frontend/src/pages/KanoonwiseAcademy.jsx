import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const KanoonwiseAcademy = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", name: "All Topics", icon: "fas fa-th-large" },
    { id: "business-law", name: "Business Law", icon: "fas fa-briefcase" },
    { id: "startup-guide", name: "Startup Guide", icon: "fas fa-rocket" },
    { id: "compliance", name: "Compliance", icon: "fas fa-shield-alt" },
    { id: "ip-law", name: "IP Law", icon: "fas fa-lightbulb" },
    { id: "tech-law", name: "Tech Law", icon: "fas fa-laptop-code" }
  ];

  const articles = [
    {
      id: 1,
      title: "Complete Guide to Private Limited Company Registration in India",
      excerpt: "Everything you need to know about registering a private limited company, from documentation to timeline and costs.",
      category: "business-law",
      readTime: "8 min read",
      image: "/academy-business-registration.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Startup Legal Checklist: 10 Essential Steps Before Launch",
      excerpt: "Critical legal steps every startup founder must complete before launching their business to avoid future complications.",
      category: "startup-guide",
      readTime: "6 min read",
      image: "/academy-startup-checklist.jpg",
      featured: true
    },
    {
      id: 3,
      title: "Trademark Registration: Protecting Your Brand Identity",
      excerpt: "Step-by-step guide to trademark registration, including costs, timeline, and common mistakes to avoid.",
      category: "ip-law",
      readTime: "7 min read",
      image: "/academy-trademark.jpg",
      featured: true
    },
    {
      id: 4,
      title: "GST Compliance for New Businesses: A Beginner's Guide",
      excerpt: "Understanding GST registration, filing requirements, and compliance obligations for new business owners.",
      category: "compliance",
      readTime: "5 min read",
      image: "/academy-gst-compliance.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Data Protection Laws for Tech Startups",
      excerpt: "Navigate data protection regulations and privacy laws that affect technology companies and startups.",
      category: "tech-law",
      readTime: "9 min read",
      image: "/academy-data-protection.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Employment Law Basics for Growing Companies",
      excerpt: "Essential employment law knowledge for companies hiring their first employees and scaling teams.",
      category: "business-law",
      readTime: "6 min read",
      image: "/academy-employment-law.jpg",
      featured: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Startup Legal Workshop: From Idea to Incorporation",
      date: "March 15, 2024",
      time: "2:00 PM - 4:00 PM IST",
      type: "Workshop",
      price: "₹999",
      description: "Interactive workshop covering legal essentials for startup founders"
    },
    {
      id: 2,
      title: "IP Protection Masterclass for Tech Companies",
      date: "March 22, 2024",
      time: "3:00 PM - 5:00 PM IST",
      type: "Masterclass",
      price: "₹1,499",
      description: "Deep dive into intellectual property protection strategies"
    },
    {
      id: 3,
      title: "Compliance Automation: Tools and Best Practices",
      date: "March 29, 2024",
      time: "11:00 AM - 12:30 PM IST",
      type: "Webinar",
      price: "Free",
      description: "Learn about tools and systems to automate business compliance"
    }
  ];

  const filteredArticles = selectedCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  const handleEventRegistration = (event) => {
    const message = `Hi! I'd like to register for "${event.title}" on ${event.date}. Please share the registration details.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 border border-yellow-500/30">
                <div className="flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full">
                  <i className="fas fa-graduation-cap text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  🎓 Learn Legal
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Kanoonwise
                  <span className="text-yellow-400"> Academy</span>
                  <br />
                  <span className="text-orange-400">Legal Knowledge</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Your comprehensive resource for business legal knowledge and startup guidance. Free articles, expert insights, and premium workshops.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    100+
                  </div>
                  <div className="text-sm text-gray-300">Free Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    50+
                  </div>
                  <div className="text-sm text-gray-300">Expert Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    Weekly
                  </div>
                  <div className="text-sm text-gray-300">New Content</div>
                </div>
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Start Learning</h3>
                <p className="text-gray-300">Explore our comprehensive legal knowledge library</p>
              </div>
              <button
                onClick={() => document.getElementById('featured-section').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Browse Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section id="featured-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Featured <span className="text-yellow-600">Articles</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and comprehensive guides to help you understand business law
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="text-gray-500 text-sm">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <button
                    onClick={() => navigate(`/articles/${article.id}`)}
                    className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-300"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/30 rounded-full blur-lg"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block w-16 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mb-6 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">Library</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Browse our comprehensive collection of legal guides and business insights
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => {
              const colors = [
                'from-yellow-500 to-orange-500',
                'from-blue-500 to-purple-500',
                'from-green-500 to-teal-500',
                'from-pink-500 to-rose-500',
                'from-indigo-500 to-blue-500',
                'from-purple-500 to-pink-500'
              ];
              const colorClass = colors[index % colors.length];

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${colorClass} text-white shadow-lg`
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-gray-200'
                  }`}
                >
                  <i className={`${category.icon} text-sm`}></i>
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => {
              const cardColors = [
                'from-yellow-50 to-orange-50 border-yellow-200',
                'from-blue-50 to-purple-50 border-blue-200',
                'from-green-50 to-teal-50 border-green-200',
                'from-pink-50 to-rose-50 border-pink-200',
                'from-indigo-50 to-blue-50 border-indigo-200',
                'from-purple-50 to-pink-50 border-purple-200'
              ];
              const cardColor = cardColors[index % cardColors.length];

              const badgeColors = [
                'bg-gradient-to-r from-yellow-400 to-orange-400 text-white',
                'bg-gradient-to-r from-blue-400 to-purple-400 text-white',
                'bg-gradient-to-r from-green-400 to-teal-400 text-white',
                'bg-gradient-to-r from-pink-400 to-rose-400 text-white',
                'bg-gradient-to-r from-indigo-400 to-blue-400 text-white',
                'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
              ];
              const badgeColor = badgeColors[index % badgeColors.length];

              return (
                <div key={article.id} className={`bg-gradient-to-br ${cardColor} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${badgeColor} px-3 py-1 rounded-full text-sm font-semibold shadow-sm`}>
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="text-gray-600 text-sm bg-white/50 px-2 py-1 rounded-full">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {article.excerpt}
                  </p>
                  <button
                    onClick={() => navigate(`/articles/${article.id}`)}
                    className="text-gray-900 hover:text-gray-700 font-semibold transition-colors duration-300 bg-white/70 hover:bg-white/90 px-4 py-2 rounded-lg"
                  >
                    Read Article →
                </button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Upcoming <span className="text-yellow-600">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our expert-led workshops, masterclasses, and webinars to deepen your legal knowledge
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    event.price === 'Free' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.price}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-calendar mr-3 text-yellow-500"></i>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-clock mr-3 text-yellow-500"></i>
                    <span>{event.time}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEventRegistration(event)}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KanoonwiseAcademy;
