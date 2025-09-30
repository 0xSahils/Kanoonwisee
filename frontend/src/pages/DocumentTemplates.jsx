import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import { getPageContent } from "../lib/contentLoader";

const DocumentTemplates = () => {
  const navigate = useNavigate();
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load CMS content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await getPageContent('document-templates');
        setPageContent(content);
      } catch (error) {
        console.error('Failed to load page content:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* CMS Content Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
        </div>
      </section>

      {/* Custom Drafting CTA */}
      <section className="py-16 bg-gray-900">
        <div className="container-custom">
          <div className="bg-gray-700 rounded-2xl p-8 border border-gray-600 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Custom Legal Documents?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find the right template? Our expert legal team can draft
              custom documents tailored to your specific requirements.
            </p>
            <button
              onClick={() => navigate("/quick-booking")}
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all"
            >
              <i className="fas fa-edit mr-2"></i>
              Request Custom Drafting
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocumentTemplates;
