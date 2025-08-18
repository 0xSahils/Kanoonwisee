import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Footer link handler
  const handleFooterLinkClick = (linkName) => {
    const path = `/${linkName.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(path);
  };

  // Newsletter subscription handler
  const handleNewsletterSubscribe = () => {
    // You can add newsletter subscription logic here
    alert("Newsletter subscription functionality to be implemented");
  };

  // Social media handler
  const handleSocialClick = (socialName) => {
    // Open social media links in new tab
    const socialUrls = {
      Facebook: "https://facebook.com/Kanoonwise",
      Twitter: "https://twitter.com/Kanoonwise",
      LinkedIn: "https://linkedin.com/company/Kanoonwise",
      Instagram: "https://instagram.com/Kanoonwise",
      YouTube: "https://youtube.com/Kanoonwise",
    };

    if (socialUrls[socialName]) {
      window.open(socialUrls[socialName], "_blank");
    }
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Find Lawyers", href: "#" },
        { name: "Company Registration", href: "#" },
        { name: "Legal Documentation", href: "#" },
        { name: "Trademark Registration", href: "#" },
        { name: "Tax Services", href: "#" },
        { name: "Property Legal", href: "#" },
      ],
    },
    {
      title: "Legal Areas",
      links: [
        { name: "Corporate Law", href: "#" },
        { name: "Family Law", href: "#" },
        { name: "Property Law", href: "#" },
        { name: "Criminal Law", href: "#" },
        { name: "Intellectual Property", href: "#" },
        { name: "Tax Law", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Legal Articles", href: "#" },
        { name: "Document Templates", href: "#" },
        { name: "Legal Calculators", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Legal News", href: "#" },
        { name: "Case Studies", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Legal Services", href: "/services" },
        { name: "Contact", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Investors", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      href: "#",
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      href: "#",
      color: "hover:text-pink-500",
    },
    {
      name: "YouTube",
      icon: "fab fa-youtube",
      href: "#",
      color: "hover:text-red-500",
    },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Disclaimer", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg">
                  <i className="fas fa-balance-scale text-white text-lg"></i>
                </div>
                <span className="text-xl sm:text-2xl font-bold">
                  Kanoonwise
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
                India's premier legal services platform connecting you with
                expert lawyers and comprehensive legal solutions for all your
                needs.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-yellow-500 w-4 sm:w-5 flex-shrink-0"></i>
                <span className="text-gray-300 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                  +91 7985179107
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-yellow-500 w-4 sm:w-5 flex-shrink-0"></i>
                <span className="text-gray-300 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                  info@Kanoonwise.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-yellow-500 w-4 sm:w-5 mt-1 flex-shrink-0"></i>
                <span className="text-gray-300 text-sm sm:text-base">
                  123 Legal Street, Business District,
                  <br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  onClick={() => handleSocialClick(social.name)}
                  className={`flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700 transform hover:-translate-y-1`}
                  aria-label={social.name}
                >
                  <i className={social.icon}></i>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="sm:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleFooterLinkClick(link.name)}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 transform inline-block text-left text-sm sm:text-base"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Join as Advocate Banner */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-700">
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
                    <span className="text-xs sm:text-sm">
                      Free Registration
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-check-circle text-green-300"></i>
                    <span className="text-xs sm:text-sm">
                      Verified Platform
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-2xl p-8 lg:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                  Stay Updated with Legal Insights
                </h3>
                <p className="text-gray-800 text-lg">
                  Get the latest legal news, tips, and updates delivered to your
                  inbox.
                </p>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent shadow-lg"
                    />
                  </div>
                  <button
                    onClick={handleNewsletterSubscribe}
                    className="bg-gray-900 text-white hover:bg-gray-800 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Subscribe Now
                  </button>
                </div>
                <p className="text-gray-700 text-sm mt-3">
                  By subscribing, you agree to our Privacy Policy and Terms of
                  Service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-12 text-center">
          <h4 className="text-xl font-semibold mb-6">
            Download Our Mobile App
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                window.open("https://apps.apple.com/app/Kanoonwise", "_blank")
              }
              className="inline-flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <i className="fab fa-apple text-2xl"></i>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.Kanoonwise",
                  "_blank"
                )
              }
              className="inline-flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <i className="fab fa-google-play text-2xl"></i>
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-center lg:text-left">
              <p>&copy; {currentYear} Kanoonwise. All rights reserved.</p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              {legalLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleFooterLinkClick(link.name)}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 z-50 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
