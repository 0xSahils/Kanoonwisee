import React from "react";
import { useNavigate } from "react-router-dom";

const KnowledgeBank = () => {
  const navigate = useNavigate();

  const featuredArticles = [
    {
      id: 1,
      title: "Understanding Your Rights Under Article 21",
      excerpt:
        "A comprehensive guide to fundamental rights and personal liberty under Indian law.",
      category: "Constitutional Law",
      author: "Adv. Priya Sharma",
      readTime: "8 min read",
      image: "/article-constitution.png",
      featured: true,
    },
    {
      id: 2,
      title: "Property Registration Process in India",
      excerpt:
        "Step-by-step guide to property registration, required documents, and legal procedures.",
      category: "Property Law",
      author: "Adv. Rajesh Kumar",
      readTime: "12 min read",
      image: "/article-property.png",
      featured: true,
    },
    {
      id: 3,
      title: "Bail Application Process in Criminal Cases",
      excerpt:
        "Understanding bail procedures, types of bail, and legal requirements in Indian courts.",
      category: "Criminal Law",
      author: "Adv. Meera Patel",
      readTime: "10 min read",
      image: "/article-court-gavel.jpeg",
      featured: false,
    },
  ];

  const legalTopics = [
    {
      icon: "fas fa-gavel",
      title: "Criminal Law",
      count: "45 Articles",
      color: "from-red-500 to-red-600",
    },
    {
      icon: "fas fa-home",
      title: "Family Law",
      count: "32 Articles",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: "fas fa-building",
      title: "Corporate Law",
      count: "28 Articles",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "fas fa-landmark",
      title: "Property Law",
      count: "38 Articles",
      color: "from-green-500 to-green-600",
    },
    {
      icon: "fas fa-balance-scale",
      title: "Civil Law",
      count: "42 Articles",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "fas fa-flag",
      title: "Constitutional Law",
      count: "25 Articles",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  const handleViewAllArticles = () => {
    navigate("/articles");
  };

  const handleTopicClick = (topic) => {
    navigate(
      `/articles?category=${topic.title.toLowerCase().replace(" ", "")}`
    );
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <div className="container-custom ">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 mb-4 border border-yellow-500/30">
            <i className="fas fa-book-open text-yellow-400"></i>
            <span className="text-yellow-400 font-semibold">
              Knowledge Bank
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Legal Insights at Your Fingertips
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay informed with expert legal articles, case studies, and insights
            from India's leading advocates. Expand your legal knowledge with our
            comprehensive resource library.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Featured Articles</h3>
            <button
              onClick={handleViewAllArticles}
              className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center space-x-2 transition-colors"
            >
              <span>View All Articles</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-200 hover:border-yellow-300"
              >
                {/* Article Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {article.readTime}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {article.author}
                    </span>
                    <i className="fas fa-arrow-right text-yellow-600 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Topics */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Explore Legal Topics
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Browse our comprehensive collection of legal articles organized by
              practice areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalTopics.map((topic, index) => (
              <div
                key={index}
                onClick={() => handleTopicClick(topic)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-yellow-300"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${topic.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <i className={`${topic.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {topic.title}
                    </h4>
                    <p className="text-gray-500 text-sm">{topic.count}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Explore articles
                  </span>
                  <i className="fas fa-arrow-right text-yellow-600 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Expert Legal Advice?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              While our articles provide valuable insights, every legal
              situation is unique. Connect with qualified advocates for
              personalized legal consultation.
            </p>
            <button
              onClick={() => navigate("/search-lawyers")}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-search mr-2"></i>
              Find Legal Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBank;
