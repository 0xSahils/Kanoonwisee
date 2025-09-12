import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Articles database - in real app, fetch from API
  const articlesDatabase = {
    1: {
      id: 1,
      title:
        "Understanding Your Rights Under Article 21 of Indian Constitution",
      excerpt:
        "A comprehensive guide to fundamental rights and personal liberty under Indian law.",
      category: "constitutional",
      author: "Adv. Priya Sharma",
      authorBio:
        "Senior Advocate at Supreme Court of India with 15+ years experience in Constitutional Law",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/article-constitution.png",
      content: `
        <h2>Introduction to Article 21</h2>
        <p>Article 21 of the Indian Constitution is one of the most fundamental and widely interpreted provisions in Indian jurisprudence. It states: "No person shall be deprived of his life or personal liberty except according to procedure established by law."</p>
        
        <h2>Historical Context</h2>
        <p>The framers of the Indian Constitution drew inspiration from various sources while drafting Article 21. The provision has its roots in the Fifth and Fourteenth Amendments of the US Constitution, which guarantee due process of law.</p>
        
        <h2>Key Components</h2>
        <h3>Right to Life</h3>
        <p>The Supreme Court has interpreted the "right to life" under Article 21 to include not merely the right to exist, but the right to live with human dignity. This encompasses:</p>
        <ul>
          <li>Right to livelihood</li>
          <li>Right to health</li>
          <li>Right to clean environment</li>
          <li>Right to education</li>
          <li>Right to privacy</li>
        </ul>
        
        <h3>Personal Liberty</h3>
        <p>Personal liberty under Article 21 includes various freedoms such as:</p>
        <ul>
          <li>Freedom of movement</li>
          <li>Freedom from arbitrary detention</li>
          <li>Right to fair trial</li>
          <li>Right against solitary confinement</li>
        </ul>
        
        <h2>Landmark Cases</h2>
        <h3>Maneka Gandhi v. Union of India (1978)</h3>
        <p>This landmark case expanded the scope of Article 21 significantly. The Supreme Court held that the procedure established by law must be just, fair, and reasonable.</p>
        
        <h2>Conclusion</h2>
        <p>Article 21 continues to evolve through judicial interpretation, adapting to contemporary challenges while maintaining its core principle of protecting life and liberty.</p>
      `,
    },
    2: {
      id: 2,
      title: "Fundamental Rights vs Directive Principles",
      excerpt:
        "Understanding the difference between Fundamental Rights and Directive Principles of State Policy.",
      category: "constitutional",
      author: "Adv. Rajesh Kumar",
      authorBio: "Constitutional Law Expert with 12+ years experience",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "/article-constitution.png",
      content: `
        <h2>Introduction</h2>
        <p>The Indian Constitution contains both Fundamental Rights and Directive Principles of State Policy, each serving different purposes in governance.</p>
        
        <h2>Fundamental Rights</h2>
        <p>Fundamental Rights are justiciable rights that can be enforced in courts:</p>
        <ul>
          <li>Right to Equality (Articles 14-18)</li>
          <li>Right to Freedom (Articles 19-22)</li>
          <li>Right against Exploitation (Articles 23-24)</li>
          <li>Right to Freedom of Religion (Articles 25-28)</li>
          <li>Cultural and Educational Rights (Articles 29-30)</li>
          <li>Right to Constitutional Remedies (Article 32)</li>
        </ul>
        
        <h2>Directive Principles</h2>
        <p>Directive Principles are non-justiciable guidelines for the state:</p>
        <ul>
          <li>Promote welfare of people</li>
          <li>Secure social justice</li>
          <li>Minimize inequalities</li>
          <li>Protect environment</li>
        </ul>
        
        <h2>Key Differences</h2>
        <p>While Fundamental Rights are enforceable in courts, Directive Principles are moral obligations of the state.</p>
        
        <h2>Conclusion</h2>
        <p>Both work together to create a just and equitable society in India.</p>
      `,
    },
    3: {
      id: 3,
      title: "Writ Jurisdiction of High Courts",
      excerpt:
        "Complete guide to writ jurisdiction and remedies available in High Courts.",
      category: "constitutional",
      author: "Adv. Meera Patel",
      authorBio: "High Court Advocate specializing in Writ Petitions",
      date: "2024-01-05",
      readTime: "10 min read",
      image: "/article-court-gavel.jpeg",
      content: `
        <h2>Introduction to Writ Jurisdiction</h2>
        <p>Article 226 of the Indian Constitution empowers High Courts to issue writs for enforcement of fundamental rights and other legal rights.</p>
        
        <h2>Types of Writs</h2>
        <h3>Habeas Corpus</h3>
        <p>Literally meaning "to have the body," this writ is issued to secure the release of a person who has been unlawfully detained.</p>
        
        <h3>Mandamus</h3>
        <p>A command issued to a public official or body to perform a duty they are legally obligated to perform.</p>
        
        <h3>Prohibition</h3>
        <p>Issued to prevent a lower court or tribunal from exceeding its jurisdiction.</p>
        
        <h3>Certiorari</h3>
        <p>Used to quash the order of a lower court or tribunal that has acted beyond its jurisdiction.</p>
        
        <h3>Quo Warranto</h3>
        <p>Challenges a person's right to hold a public office.</p>
        
        <h2>Procedure for Filing</h2>
        <p>Writ petitions must be filed with proper documentation and legal grounds.</p>
        
        <h2>Conclusion</h2>
        <p>Writ jurisdiction is a powerful tool for protecting constitutional rights and ensuring good governance.</p>
      `,
    },
    4: {
      id: 4,
      title: "Right to Privacy: Recent Developments",
      excerpt:
        "Latest Supreme Court judgments and developments in privacy law.",
      category: "constitutional",
      author: "Adv. Anita Singh",
      authorBio: "Constitutional Law Expert specializing in Privacy Rights",
      date: "2024-01-01",
      readTime: "12 min read",
      image: "/article-constitution.png",
      content: `
        <h2>Right to Privacy as Fundamental Right</h2>
        <p>The Supreme Court in K.S. Puttaswamy v. Union of India (2017) declared privacy as a fundamental right under Article 21.</p>
        
        <h2>Key Aspects of Privacy</h2>
        <ul>
          <li>Informational privacy</li>
          <li>Physical privacy</li>
          <li>Decisional privacy</li>
        </ul>
        
        <h2>Digital Privacy Concerns</h2>
        <p>With increasing digitization, privacy concerns have expanded to include:</p>
        <ul>
          <li>Data protection</li>
          <li>Surveillance issues</li>
          <li>Biometric data collection</li>
          <li>Social media privacy</li>
        </ul>
        
        <h2>Personal Data Protection Bill</h2>
        <p>The proposed legislation aims to regulate data processing and protect individual privacy.</p>
        
        <h2>Recent Judgments</h2>
        <p>Recent Supreme Court cases have further strengthened privacy protections in various contexts.</p>
        
        <h2>Conclusion</h2>
        <p>Privacy rights continue to evolve with technological advancement and judicial interpretation.</p>
      `,
    },
  };

  // Get article based on ID, fallback to article 1 if not found
  const article = articlesDatabase[parseInt(id)] || articlesDatabase[1];

  // Get related articles (exclude current article)
  const relatedArticles = Object.values(articlesDatabase)
    .filter((art) => art.id !== parseInt(id))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Article Header */}
      <section className="navbar-spacing-simple pb-8 bg-primary-900 text-white">
        <div className="container-custom pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate("/articles")}
              className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to Articles</span>
            </button>

            <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 border border-yellow-500/30">
              {article.category.charAt(0).toUpperCase() +
                article.category.slice(1)}{" "}
              Law
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-gray-300 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30 flex-shrink-0">
                  <i className="fas fa-user text-yellow-400"></i>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white">
                    {article.author}
                  </div>
                  <div className="text-sm text-gray-300 line-clamp-2">
                    {article.authorBio}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <i className="fas fa-calendar mr-1"></i>
                  {article.date}
                </span>
                <span className="flex items-center">
                  <i className="fas fa-clock mr-1"></i>
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Image */}
      <section className="py-6 sm:py-8 bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-48 sm:h-64 md:h-80 lg:h-96 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center border">
              <div className="text-center text-yellow-400 px-4">
                <i className="fas fa-balance-scale text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4"></i>
                <p className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2">
                  {article.title}
                </p>
                <p className="text-xs sm:text-sm opacity-75 mt-2">
                  {article.image}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-6 sm:py-8 bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200">
                  <div
                    className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-headings:font-bold prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg sm:prose-h3:text-xl"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>

                {/* Share Section */}
                <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                    Share this article
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="flex items-center justify-center sm:justify-start space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                      <i className="fab fa-facebook-f"></i>
                      <span>Facebook</span>
                    </button>
                    <button className="flex items-center justify-center sm:justify-start space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors text-sm sm:text-base">
                      <i className="fab fa-twitter"></i>
                      <span>Twitter</span>
                    </button>
                    <button className="flex items-center justify-center sm:justify-start space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm sm:text-base">
                      <i className="fab fa-linkedin-in"></i>
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 order-first lg:order-last">
                <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
                  {/* Table of Contents */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                      Table of Contents
                    </h3>
                    <nav className="space-y-2 text-xs sm:text-sm">
                      <a
                        href="#introduction"
                        className="block text-gray-600 hover:text-yellow-600 transition-colors py-1"
                      >
                        Introduction to Article 21
                      </a>
                      <a
                        href="#historical"
                        className="block text-gray-600 hover:text-yellow-600 transition-colors py-1"
                      >
                        Historical Context
                      </a>
                      <a
                        href="#components"
                        className="block text-gray-600 hover:text-yellow-600 transition-colors py-1"
                      >
                        Key Components
                      </a>
                      <a
                        href="#cases"
                        className="block text-gray-600 hover:text-yellow-600 transition-colors py-1"
                      >
                        Landmark Cases
                      </a>
                      <a
                        href="#modern"
                        className="block text-gray-600 hover:text-yellow-600 transition-colors py-1"
                      >
                        Modern Applications
                      </a>
                      <a
                        href="#conclusion"
                        className="block text-gray-600 hover:text-yellow-600 transition-colors py-1"
                      >
                        Conclusion
                      </a>
                    </nav>
                  </div>

                  {/* Author Info */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-yellow-500/30">
                        <i className="fas fa-user text-yellow-600 text-lg sm:text-xl"></i>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                        {article.author}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                        {article.authorBio}
                      </p>
                      <button className="btn-primary px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedArticles.map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  onClick={() => navigate(`/articles/${relatedArticle.id}`)}
                  className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer p-4 sm:p-6 border border-gray-200 hover:border-yellow-300 transform hover:-translate-y-1"
                >
                  <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium inline-block mb-3">
                    {relatedArticle.category}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 hover:text-yellow-600 transition-colors text-sm sm:text-base line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {relatedArticle.readTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
