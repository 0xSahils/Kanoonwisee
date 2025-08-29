import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Check if we're on homepage
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest("nav")) {
        setIsMenuOpen(false);
        setOpenDropdowns({});
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Navigation handlers
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setOpenDropdowns({});
  };

  const handleDropdownClick = (item) => {
    // Handle specific navigation cases
    const routeMap = {
      // Resources menu
      "Kanoonwise Academy": "/academy",
      "Legal Insights": "/legal-insights",
      "Document Templates": "/document-templates",

      // Business Services menu
      "Business Setup": "/business-setup",
      "Trademark & IP": "/trademark-ip",
      "The Startup Legal Kit": "/startup-legal-kit",
      "Compliance Package": "/compliance-package",

      // Find a Lawyer menu - navigate to search with specialization
      "Business & Startup Law": "/search-lawyers?specialization=Business%20%26%20Startup%20Law",
      "Tech Law": "/search-lawyers?specialization=Tech%20Law",
      "Corporate Law": "/search-lawyers?specialization=Corporate%20Law",
      "Intellectual Property": "/search-lawyers?specialization=Intellectual%20Property",
    };

    if (routeMap[item.name]) {
      navigate(routeMap[item.name]);
    } else {
      // Default navigation for services
      const path = `/${item.name.toLowerCase().replace(/\s+/g, "-")}`;
      navigate(path);
    }
    setIsMenuOpen(false);
    setOpenDropdowns({});
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleDashboardNavigation = () => {
    const dashboardPath =
      user?.role === "lawyer" ? "/lawyer/dashboard" : "/client/dashboard";
    navigate(dashboardPath);
    setIsMenuOpen(false);
    setOpenDropdowns({});
  };

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const navItems = [
    {
      name: "Find a Lawyer",
      icon: "fas fa-search",
      dropdown: [
        { name: "Business & Startup Law", icon: "fas fa-building" },
        { name: "Tech Law", icon: "fas fa-laptop-code" },
        { name: "Corporate Law", icon: "fas fa-briefcase" },
        { name: "Intellectual Property", icon: "fas fa-lightbulb" },
      ],
    },
    {
      name: "Business Services",
      icon: "fas fa-briefcase",
      dropdown: [
        { name: "Business Setup", icon: "fas fa-rocket" },
        { name: "Trademark & IP", icon: "fas fa-trademark" },
        { name: "The Startup Legal Kit", icon: "fas fa-box" },
        { name: "Compliance Package", icon: "fas fa-shield-alt" },
      ],
    },
    {
      name: "Resources",
      icon: "fas fa-book",
      dropdown: [
        { name: "Kanoonwise Academy", icon: "fas fa-graduation-cap" },
        { name: "Legal Insights", icon: "fas fa-lightbulb" },
        { name: "Document Templates", icon: "fas fa-file-alt" },
      ],
    },
    {
      name: "About Us",
      icon: "fas fa-info-circle",
      path: "/about-us",
    },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isHomepage
          ? isScrolled
            ? "bg-white shadow-lg"
            : "bg-white/10 backdrop-blur-md"
          : "bg-white shadow-lg"
      }`}
      style={{ height: "auto" }}
    >
      {/* Top Contact Bar */}
      {!isScrolled && (
        <div className="bg-gray-900 text-white py-2 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-8">
              <span className="flex items-center">
                <i className="fas fa-clock mr-2 text-yellow-500"></i>
                8:00 - 19:00 Our Opening Hours Mon. - Fri.
              </span>
              <span className="flex items-center">
                <i className="fas fa-phone mr-2 text-yellow-500"></i>
                +91 98765 43210 Call Us For Free Consultation
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="#"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xl">K</span>
              </div>
              <span
                className={`text-2xl font-light tracking-wide ${
                  isHomepage
                    ? isScrolled
                      ? "text-gray-900"
                      : "text-white"
                    : "text-gray-900"
                }`}
              >
                Kanoonwise
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() =>
                    item.path ? handleNavigation(item.path) : null
                  }
                  className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${
                    isHomepage
                      ? isScrolled
                        ? "text-gray-700 hover:text-yellow-600"
                        : "text-white hover:text-yellow-500"
                      : "text-gray-700 hover:text-yellow-600"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <i className="fas fa-chevron-down text-xs group-hover:rotate-180 transition-transform duration-200"></i>
                  )}
                </button>

                {/* Dropdown - only show if item has dropdown */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem, dropIndex) => (
                        <button
                          key={dropIndex}
                          onClick={() => handleDropdownClick(dropdownItem)}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 w-full text-left"
                        >
                          <i
                            className={`${dropdownItem.icon} text-yellow-500 w-4`}
                          ></i>
                          <span>{dropdownItem.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation("/my-appointments")}
                  className={`font-medium transition-colors duration-200 flex items-center ${
                    isHomepage
                      ? isScrolled
                        ? "text-gray-700 hover:text-yellow-600"
                        : "text-white hover:text-yellow-500"
                      : "text-gray-700 hover:text-yellow-600"
                  }`}
                >
                  <i className="fas fa-calendar-alt mr-2"></i>
                  My Appointments
                </button>
                <div className="relative group">
                  <button
                    className={`flex items-center space-x-2 font-medium transition-colors duration-200 ${
                      isHomepage
                        ? isScrolled
                          ? "text-gray-700 hover:text-yellow-600"
                          : "text-white hover:text-yellow-500"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    <i className="fas fa-user-circle"></i>
                    <span>{user?.email?.split("@")[0] || "User"}</span>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <button
                        onClick={handleDashboardNavigation}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 w-full text-left"
                      >
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={() => handleNavigation("/my-appointments")}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 w-full text-left"
                      >
                        <i className="fas fa-calendar-alt"></i>
                        <span>My Appointments</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left border-t border-gray-100"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/join-as-lawyer")}
                  className={`font-medium transition-colors duration-200 flex items-center ${
                    isHomepage
                      ? isScrolled
                        ? "text-gray-700 hover:text-orange-600"
                        : "text-white hover:text-orange-300"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  <i className="fas fa-balance-scale mr-2"></i>
                  Join as Advocate
                </button>
                <button
                  onClick={() => handleNavigation("/login")}
                  className={`font-medium transition-colors duration-200 ${
                    isHomepage
                      ? isScrolled
                        ? "text-gray-700 hover:text-yellow-600"
                        : "text-white hover:text-yellow-500"
                      : "text-gray-700 hover:text-yellow-600"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/search-lawyers")}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Find Advocate
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (isMenuOpen) {
                setOpenDropdowns({});
              }
            }}
          >
            <div className="space-y-1">
              <div
                className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4 bg-white rounded-lg shadow-lg mt-2 border border-gray-100 mx-4">
            {navItems.map((item, index) => (
              <div key={index} className="px-4">
                <button
                  onClick={() => item.path ? handleNavigation(item.path) : toggleDropdown(index)}
                  className="flex items-center justify-between w-full text-gray-700 font-medium py-3 border-b border-gray-100 hover:text-yellow-600 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <i className={`${item.icon} text-yellow-600`}></i>
                    <span className="text-base">{item.name}</span>
                  </div>
                  {item.dropdown && (
                    <i
                      className={`fas fa-chevron-down text-sm transition-transform duration-200 ${
                        openDropdowns[index] ? "rotate-180" : ""
                      }`}
                    ></i>
                  )}
                </button>
                {item.dropdown && (
                  <div
                    className={`ml-6 space-y-1 mt-2 overflow-hidden transition-all duration-300 ${
                      openDropdowns[index]
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.dropdown.map((dropdownItem, dropIndex) => (
                      <button
                        key={dropIndex}
                        onClick={() => handleDropdownClick(dropdownItem)}
                        className="flex items-center space-x-3 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 py-3 px-2 rounded-lg transition-all duration-200 w-full text-left min-h-[44px]"
                      >
                        <i
                          className={`${dropdownItem.icon} text-sm text-yellow-500`}
                        ></i>
                        <span className="text-sm">{dropdownItem.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="px-4 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={handleDashboardNavigation}
                      className="w-full text-left text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 font-medium py-3 px-3 rounded-lg transition-all duration-200 flex items-center space-x-3 min-h-[44px]"
                    >
                      <i className="fas fa-tachometer-alt text-yellow-600"></i>
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNavigation("/my-appointments")}
                      className="w-full text-left text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 font-medium py-3 px-3 rounded-lg transition-all duration-200 flex items-center space-x-3 min-h-[44px]"
                    >
                      <i className="fas fa-calendar-alt text-yellow-600"></i>
                      <span>My Appointments</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50 font-medium py-3 px-3 rounded-lg transition-all duration-200 flex items-center space-x-3 border-t border-gray-100 mt-3 pt-3 min-h-[44px]"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigation("/join-as-lawyer")}
                      className="w-full text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium py-3 px-3 rounded-lg transition-all duration-200 flex items-center space-x-3 min-h-[44px]"
                    >
                      <i className="fas fa-balance-scale text-orange-600"></i>
                      <span>Join as Advocate</span>
                    </button>
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="w-full text-left text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 font-medium py-3 px-3 rounded-lg transition-all duration-200 min-h-[44px]"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleNavigation("/search-lawyers")}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 mt-3 min-h-[44px]"
                    >
                      <i className="fas fa-search mr-2"></i>
                      Find Advocate
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
