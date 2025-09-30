import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { getPageContent } from "../lib/contentLoader";

const KanoonwiseAcademy = () => {
  const navigate = useNavigate();
  const [pageContent, setPageContent] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load CMS content
  useEffect(() => {
    const content = getPageContent('kanoonwise-academy');
    setPageContent(content);
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

  const featuredArticles = articles.filter(article => article.featured);

  if (!pageContent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

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
                  {pageContent.frontmatter.hero_title}
                  <span className="text-yellow-400"> {pageContent.frontmatter.subtitle}</span>
                  <br />
                  <span className="text-orange-400">{pageContent.frontmatter.hero_subtitle}</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  {pageContent.frontmatter.hero_description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {pageContent.frontmatter.stats && pageContent.frontmatter.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
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
            {featuredArticles.map((article) => (
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

      {/* CMS Content Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/30 rounded-full blur-lg"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KanoonwiseAcademy;
