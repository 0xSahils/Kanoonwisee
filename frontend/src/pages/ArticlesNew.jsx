import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const Articles = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: "all", name: "All Articles", icon: "fas fa-list" },
    { id: "criminal", name: "Criminal Law", icon: "fas fa-gavel" },
    { id: "civil", name: "Civil Law", icon: "fas fa-balance-scale" },
    { id: "corporate", name: "Corporate Law", icon: "fas fa-building" },
    { id: "family", name: "Family Law", icon: "fas fa-home" },
    { id: "property", name: "Property Law", icon: "fas fa-landmark" },
    { id: "constitutional", name: "Constitutional Law", icon: "fas fa-flag" },
  ];

  const articles = [
    {
      id: 1,
      title:
        "Understanding Your Rights Under Article 21 of Indian Constitution",
      excerpt:
        "A comprehensive guide to fundamental rights and personal liberty under Indian law.",
      category: "constitutional",
      author: "Adv. Priya Sharma",
      date: "2024-01-15",
      readTime: "8 min read",
      featured: true,
      image: "/article-constitution.png",
    },
    {
      id: 2,
      title: "Property Registration Process in India: Complete Guide",
      excerpt:
        "Step-by-step process for property registration, required documents, and legal procedures.",
      category: "property",
      author: "Adv. Rajesh Kumar",
      date: "2024-01-12",
      readTime: "12 min read",
      featured: true,
      image: "/article-property.png",
    },
    {
      id: 3,
      title: "Bail Application Process in Criminal Cases",
      excerpt:
        "Understanding bail procedures, types of bail, and legal requirements in Indian courts.",
      category: "criminal",
      author: "Adv. Meera Patel",
      date: "2024-01-10",
      readTime: "10 min read",
      featured: false,
      image: "/article-court-gavel.jpeg",
    },
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const featuredArticles = articles.filter((article) => article.featured);

  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative navbar-spacing-simple pb-12 sm:pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        </div>

        <div className="container-custom relative z-10 pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <i className="fas fa-book-open text-yellow-400"></i>
                <span className="text-yellow-400 font-semibold text-sm sm:text-base">
                  Knowledge Bank
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Legal Insights at Your
                <span className="text-yellow-400"> Fingertips</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Stay informed with expert legal articles, case studies, and
                insights from India's leading advocates across all practice
                areas.
              </p>
            </div>

            {/* Right Content - Legal Books Image */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden h-80 lg:h-96 border border-yellow-500/30">
                <img
                  src="/articles-hero.jpg"
                  alt="Legal Books and Documents on Professional Desk"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">Legal Knowledge Hub</p>
                  <p className="text-sm opacity-90">
                    Expert insights & analysis
                  </p>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 lg:w-20 h-16 lg:h-20 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-balance-scale text-yellow-400 text-xl lg:text-2xl"></i>
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 lg:w-16 h-14 lg:h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-gavel text-orange-400 text-lg lg:text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12 sm:py-16 bg-gray-800">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Featured Articles
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="bg-gray-700 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-600 transform hover:-translate-y-1"
              >
                <div className="h-40 sm:h-48 overflow-hidden border-b border-gray-600">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm mb-3 sm:mb-4">
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium border border-yellow-500/30 self-start">
                      {
                        categories.find((cat) => cat.id === article.category)
                          ?.name
                      }
                    </span>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-400">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-600">
                    <span className="text-xs sm:text-sm text-gray-400">
                      By {article.author}
                    </span>
                    <i className="fas fa-arrow-right text-yellow-400 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles with Categories */}
      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-700 lg:sticky lg:top-24">
                <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">
                  Browse by Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-center lg:justify-start space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl transition-all text-sm lg:text-base ${
                        selectedCategory === category.id
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <i className={category.icon}></i>
                      <span className="hidden sm:inline lg:inline">
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:w-3/4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {selectedCategory === "all"
                    ? "All Articles"
                    : categories.find((cat) => cat.id === selectedCategory)
                        ?.name}
                </h2>
                <span className="text-gray-400 text-sm sm:text-base">
                  {filteredArticles.length} articles
                </span>
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleClick(article.id)}
                    className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-700 transform hover:-translate-y-1"
                  >
                    <div className="h-28 sm:h-32 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center border-b border-gray-600">
                      <div className="text-center text-gray-400">
                        <i className="fas fa-file-alt text-xl sm:text-2xl mb-1"></i>
                        <p className="text-xs">{article.image}</p>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs mb-3">
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full border border-gray-600 self-start">
                          {
                            categories.find(
                              (cat) => cat.id === article.category
                            )?.name
                          }
                        </span>
                        <span className="text-gray-400">
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-700">
                        <span className="text-gray-400 truncate">
                          {article.author}
                        </span>
                        <span className="text-gray-500 ml-2">
                          {article.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;
