import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const LegalInsights = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filters = [
    { id: "all", name: "All Insights" },
    { id: "recent", name: "Recent Updates" },
    { id: "trending", name: "Trending" },
    { id: "expert-opinion", name: "Expert Opinion" }
  ];

  const insights = [
    {
      id: 1,
      title: "New Compliance Requirements for Tech Startups in 2024",
      excerpt: "Recent regulatory changes affecting technology companies and what startups need to know to stay compliant.",
      author: "Adv. Priya Sharma",
      authorRole: "Tech Law Expert",
      publishDate: "March 10, 2024",
      readTime: "5 min read",
      category: "Regulatory Update",
      tags: ["Tech Law", "Compliance", "Startups"],
      image: "/insights-tech-compliance.jpg",
      type: "recent"
    },
    {
      id: 2,
      title: "Supreme Court Ruling on Digital Privacy: Impact on Businesses",
      excerpt: "Analysis of the recent Supreme Court judgment on digital privacy and its implications for business operations.",
      author: "Adv. Rajesh Kumar",
      authorRole: "Privacy Law Specialist",
      publishDate: "March 8, 2024",
      readTime: "7 min read",
      category: "Court Ruling",
      tags: ["Privacy Law", "Digital Rights", "Business Impact"],
      image: "/insights-privacy-ruling.jpg",
      type: "trending"
    },
    {
      id: 3,
      title: "GST Amendment Act 2024: Key Changes for Businesses",
      excerpt: "Comprehensive breakdown of the latest GST amendments and how they affect different types of businesses.",
      author: "Adv. Meera Patel",
      authorRole: "Tax Law Expert",
      publishDate: "March 5, 2024",
      readTime: "6 min read",
      category: "Tax Update",
      tags: ["GST", "Tax Law", "Business Compliance"],
      image: "/insights-gst-amendment.jpg",
      type: "recent"
    },
    {
      id: 4,
      title: "Intellectual Property Trends in the AI Era",
      excerpt: "Expert analysis on how artificial intelligence is reshaping intellectual property law and protection strategies.",
      author: "Adv. Arjun Singh",
      authorRole: "IP Law Specialist",
      publishDate: "March 3, 2024",
      readTime: "8 min read",
      category: "Expert Analysis",
      tags: ["IP Law", "AI", "Technology"],
      image: "/insights-ai-ip.jpg",
      type: "expert-opinion"
    },
    {
      id: 5,
      title: "Employment Law Changes: Remote Work Regulations",
      excerpt: "New guidelines for remote work arrangements and their legal implications for employers and employees.",
      author: "Adv. Sneha Gupta",
      authorRole: "Employment Law Expert",
      publishDate: "February 28, 2024",
      readTime: "4 min read",
      category: "Employment Law",
      tags: ["Employment", "Remote Work", "Labor Law"],
      image: "/insights-remote-work.jpg",
      type: "trending"
    },
    {
      id: 6,
      title: "Startup Funding: Legal Considerations for Series A",
      excerpt: "Essential legal aspects that startups must consider when raising Series A funding rounds.",
      author: "Adv. Vikram Joshi",
      authorRole: "Corporate Law Expert",
      publishDate: "February 25, 2024",
      readTime: "9 min read",
      category: "Startup Law",
      tags: ["Startup", "Funding", "Corporate Law"],
      image: "/insights-series-a.jpg",
      type: "expert-opinion"
    }
  ];

  const filteredInsights = selectedFilter === "all" 
    ? insights 
    : insights.filter(insight => insight.type === selectedFilter);

  const featuredInsight = insights[0]; // First insight as featured

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
                  <i className="fas fa-lightbulb text-gray-900 text-xs"></i>
                </div>
                <span className="text-sm font-semibold text-yellow-400">
                  💡 Expert Analysis
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Legal
                  <span className="text-yellow-400"> Insights</span>
                  <br />
                  <span className="text-orange-400">Stay Updated</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Stay updated with the latest legal developments, court rulings, and expert analysis. Expert commentary on legal trends affecting businesses.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    Weekly
                  </div>
                  <div className="text-sm text-gray-300">New Insights</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    Expert
                  </div>
                  <div className="text-sm text-gray-300">Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    Latest
                  </div>
                  <div className="text-sm text-gray-300">Updates</div>
                </div>
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Stay Informed</h3>
                <p className="text-gray-300">Get the latest legal insights and expert analysis</p>
              </div>
              <button
                onClick={() => document.getElementById('featured-insight-section').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Read Insights
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insight Section */}
      <section id="featured-insight-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Featured <span className="text-yellow-600">Insight</span>
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src={featuredInsight.image}
                  alt={featuredInsight.title}
                  className="w-full h-full object-cover min-h-[400px]"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                    {featuredInsight.category}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredInsight.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredInsight.excerpt}
                </p>
                <div className="flex items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-semibold text-gray-900">{featuredInsight.author}</p>
                      <p className="text-sm text-gray-600">{featuredInsight.authorRole}</p>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm text-gray-600">{featuredInsight.publishDate}</p>
                    <p className="text-sm text-gray-500">{featuredInsight.readTime}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/insights/${featuredInsight.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-xl transition-all duration-300 self-start"
                >
                  Read Full Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Latest <span className="text-yellow-600">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our collection of expert legal analysis and industry updates
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Insights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.slice(1).map((insight) => (
              <div key={insight.id} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {insight.category}
                    </span>
                    <span className="text-gray-500 text-sm">{insight.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{insight.author}</p>
                      <p className="text-xs text-gray-600">{insight.authorRole}</p>
                    </div>
                    <p className="text-sm text-gray-500">{insight.publishDate}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {insight.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/insights/${insight.id}`)}
                    className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-300"
                  >
                    Read Analysis →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="inline-block w-12 h-1 bg-yellow-500 mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Stay Updated with <span className="text-yellow-600">Legal Insights</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest legal updates, expert analysis, and industry insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam. Unsubscribe anytime. Read our privacy policy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LegalInsights;
