import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { getPageContent } from "../lib/contentLoader";
import toast from "react-hot-toast";

const DocumentTemplates = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pageContent, setPageContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Use CMS data when loaded, fallback only on error
  const categories = (pageContent?.frontmatter?.categories && !loadError && Array.isArray(pageContent.frontmatter.categories)) 
    ? pageContent.frontmatter.categories 
    : [
      { id: "all", name: "All Templates", icon: "fas fa-list" },
      { id: "business", name: "Business", icon: "fas fa-building" },
      { id: "property", name: "Property", icon: "fas fa-home" },
      { id: "family", name: "Family", icon: "fas fa-users" },
      { id: "employment", name: "Employment", icon: "fas fa-briefcase" },
      { id: "legal-notices", name: "Legal Notices", icon: "fas fa-file-alt" },
    ];

  const templates = (pageContent?.frontmatter?.templates && !loadError && Array.isArray(pageContent.frontmatter.templates))
    ? pageContent.frontmatter.templates
    : [
      {
        id: 1,
        title: "Non-Disclosure Agreement (NDA)",
        description:
          "Comprehensive NDA template for business partnerships and employee agreements",
        category: "business",
        downloads: "2.5k",
        rating: 4.8,
        price: "Free",
        image: "/template-nda.png",
        features: ["Mutual NDA", "One-way NDA", "Employee NDA", "Vendor NDA"],
      },
      {
        id: 2,
        title: "Rental Agreement",
        description:
          "Standard rental agreement template for residential and commercial properties",
        category: "property",
        downloads: "3.2k",
        rating: 4.9,
        price: "₹299",
        image: "/template-rental.png",
        features: [
          "11-month Agreement",
          "Security Deposit Clause",
          "Maintenance Terms",
          "Termination Clause",
        ],
      },
      {
        id: 3,
        title: "Employment Contract",
        description:
          "Comprehensive employment contract template with all essential clauses",
        category: "employment",
        downloads: "1.8k",
        rating: 4.7,
        price: "₹499",
        image: "/template-employment.png",
        features: [
          "Salary Structure",
          "Leave Policy",
          "Confidentiality",
          "Termination Terms",
        ],
      },
      {
        id: 4,
        title: "Legal Notice Template",
        description:
          "Professional legal notice template for various legal matters",
        category: "legal-notices",
        downloads: "1.5k",
        rating: 4.6,
        price: "₹199",
        image: "/template-legal-notice.png",
        features: [
          "Demand Notice",
          "Defamation Notice",
          "Breach of Contract",
          "Recovery Notice",
        ],
      },
      {
        id: 5,
        title: "Will and Testament",
        description:
          "Legally valid will template with comprehensive asset distribution clauses",
        category: "family",
        downloads: "900",
        rating: 4.9,
        price: "₹799",
        image: "/template-will.jpg",
        features: [
          "Asset Distribution",
          "Guardian Appointment",
          "Executor Nomination",
          "Witness Requirements",
        ],
      },
      {
        id: 6,
        title: "Partnership Deed",
        description:
          "Complete partnership deed template for business partnerships",
        category: "business",
        downloads: "1.2k",
        rating: 4.8,
        price: "₹599",
        image: "/template-partnership.webp",
        features: [
          "Profit Sharing",
          "Capital Contribution",
          "Decision Making",
          "Exit Clause",
        ],
      },
    ];

  const filteredTemplates =
    selectedCategory === "all"
      ? (templates || [])
      : (templates || []).filter((template) => template.category === selectedCategory);

  const handleTemplateClick = (templateId) => {
    navigate(`/templates/${templateId}`);
  };

  const handleDownload = () => {
    // Mock download functionality
    toast.success("Template download started!");
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load CMS content
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setLoadError(false);
        
        const content = getPageContent('document-templates');
        
        if (content && content.frontmatter) {
          setPageContent(content);
        } else {
          console.warn('No CMS content found, will use fallback data');
          setLoadError(true);
        }
      } catch (error) {
        console.error('Error loading CMS content:', error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-white">Loading content...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900">
      {loadError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 text-sm">
          <div className="max-w-7xl mx-auto flex items-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            CMS content could not be loaded. Displaying fallback content.
          </div>
        </div>
      )}
      <Header />

      {/* Hero Section */}
      <section className="relative navbar-spacing-simple pb-16 bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0"></div>
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-yellow-500/20 rounded-full px-4 py-2 mb-6">
                <i className="fas fa-file-alt text-yellow-400"></i>
                <span className="text-yellow-400 font-semibold">
                  Document Templates
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {(pageContent?.frontmatter?.hero?.title && !loadError && typeof pageContent.frontmatter.hero.title === 'string') 
                  ? pageContent.frontmatter.hero.title 
                  : 'Legal Document'}
                <span className="text-yellow-400"> Templates</span>
                <br />
                <span className="text-orange-400">
                  {(pageContent?.frontmatter?.hero?.subtitle && !loadError && typeof pageContent.frontmatter.hero.subtitle === 'string') 
                    ? pageContent.frontmatter.hero.subtitle 
                    : 'Ready to Use'}
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {(pageContent?.frontmatter?.hero?.description && !loadError && typeof pageContent.frontmatter.hero.description === 'string') 
                  ? pageContent.frontmatter.hero.description 
                  : 'Download professionally drafted legal document templates. Save time and ensure legal compliance with our comprehensive collection of legal documents.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all">
                  <i className="fas fa-download mr-2"></i>
                  Browse Templates
                </button>
                <button className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 font-bold py-3 px-8 rounded-lg transition-all">
                  <i className="fas fa-edit mr-2"></i>
                  Custom Drafting
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 border border-yellow-500/30">
                <img
                  src="/templates-hero.jpg"
                  alt="Stack of Legal Documents and Templates"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-semibold">
                    Professional Templates
                  </p>
                  <p className="text-sm opacity-90">
                    Ready-to-use legal documents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-gray-800">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-gray-700 rounded-2xl p-6 border border-gray-600 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        selectedCategory === category.id
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "text-gray-300 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      <i className={category.icon}></i>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Templates Grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">
                  {selectedCategory === "all"
                    ? "All Templates"
                    : categories.find((cat) => cat.id === selectedCategory)
                        ?.name}
                </h2>
                <span className="text-gray-400">
                  {filteredTemplates.length} templates
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-600"
                  >
                    {/* Template Image */}
                    <div className="h-40 bg-gray-700 flex items-center justify-center border-b border-gray-600">
                      <div className="text-center text-yellow-400">
                        <i className="fas fa-file-alt text-3xl mb-2"></i>
                        <p className="text-xs opacity-75">{template.image}</p>
                      </div>
                    </div>

                    {/* Template Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium border border-yellow-500/30">
                          {
                            categories.find(
                              (cat) => cat.id === template.category
                            )?.name
                          }
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400 font-bold">
                            {template.price}
                          </span>
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-star text-yellow-400 text-xs"></i>
                            <span className="text-gray-400 text-xs">
                              {template.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {template.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {template.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-400 mb-2">
                          Includes:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {template.features
                            .slice(0, 2)
                            .map((feature, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                          {template.features.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{template.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                        <span className="text-xs text-gray-400">
                          <i className="fas fa-download mr-1"></i>
                          {template.downloads} downloads
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleTemplateClick(template.id)}
                            className="text-yellow-400 hover:text-yellow-300 text-sm"
                          >
                            <i className="fas fa-eye mr-1"></i>
                            Preview
                          </button>
                          <button
                            onClick={() => handleDownload()}
                            className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 text-sm px-3 py-1 rounded transition-all"
                          >
                            <i className="fas fa-download mr-1"></i>
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Drafting CTA */}
      <section className="py-16 bg-gray-900">
        <div className="container-custom">
          <div className="bg-gray-700 rounded-2xl p-8 border border-gray-600 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {(pageContent?.frontmatter?.customDrafting?.title && !loadError && typeof pageContent.frontmatter.customDrafting.title === 'string') 
                ? pageContent.frontmatter.customDrafting.title 
                : 'Need Custom Legal Documents?'}
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {(pageContent?.frontmatter?.customDrafting?.description && !loadError && typeof pageContent.frontmatter.customDrafting.description === 'string') 
                ? pageContent.frontmatter.customDrafting.description 
                : "Can't find the right template? Our expert legal team can draft custom documents tailored to your specific requirements."}
            </p>
            <button
              onClick={() => navigate("/quick-booking")}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all"
            >
              <i className="fas fa-edit mr-2"></i>
              {(pageContent?.frontmatter?.customDrafting?.buttonText && !loadError && typeof pageContent.frontmatter.customDrafting.buttonText === 'string') 
                ? pageContent.frontmatter.customDrafting.buttonText 
                : 'Request Custom Drafting'}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocumentTemplates;
