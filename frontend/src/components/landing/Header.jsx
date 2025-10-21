import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";

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
    if (item.path) {
      navigate(item.path);
      setIsMenuOpen(false);
      setOpenDropdowns({});
      return;
    }

    const routeMap = {
      "Kanoonwise Academy": "/academy",
      "Legal Insights": "/legal-insights",
      "Document Templates": "/document-templates",
      "Business Services": "/business-services",
      "Business & Startup Law":
        "/search-lawyers?specialization=Business%20%26%20Startup%20Law",
      "Tech Law": "/search-lawyers?specialization=Tech%20Law",
      "Corporate Law": "/search-lawyers?specialization=Corporate%20Law",
      "Intellectual Property":
        "/search-lawyers?specialization=Intellectual%20Property",
    };

    if (routeMap[item.name]) {
      navigate(routeMap[item.name]);
    } else {
      const path = `/${item.name.toLowerCase().replace(/\s+/g, "-")}`;
      navigate(path);
    }
    setIsMenuOpen(false);
    setOpenDropdowns({});
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/");
    }
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
      name: "Business Services",
      icon: "fas fa-briefcase",
      dropdown: [
        {
          name: "Business Setup",
          icon: "fas fa-rocket",
          subDropdown: [
            {
              name: "Private Limited Company",
              icon: "fas fa-building",
              path: "/private-limited-registration",
            },
            {
              name: "Limited Liability Partnership",
              icon: "fas fa-handshake",
              path: "/llp-registration",
            },
            {
              name: "One Person Company",
              icon: "fas fa-user-tie",
              path: "/opc-registration",
            },
            {
              name: "Sole Proprietorship",
              icon: "fas fa-user-circle",
              path: "/sole-proprietorship-registration",
            },
            {
              name: "Partnership Firm",
              icon: "fas fa-users",
              path: "/partnership-firm-registration",
            },
            {
              name: "Nidhi Company",
              icon: "fas fa-university",
              path: "/nidhi-company-registration",
            },
          ],
        },
        {
          name: "Trademark & IP",
          icon: "fas fa-trademark",
          subDropdown: [
            {
              name: "Trademark Registration",
              icon: "fas fa-certificate",
              path: "/trademark-services",
            },
            {
              name: "Patent Services",
              icon: "fas fa-lightbulb",
              path: "/patent-services",
            },
            {
              name: "Copyright Registration",
              icon: "fas fa-copyright",
              path: "/copyright-services",
            },
            {
              name: "Design Registration",
              icon: "fas fa-palette",
              path: "/design-registration",
            },
          ],
        },
        {
          name: "The Startup Legal Kit",
          icon: "fas fa-box",
          subDropdown: [
            {
              name: "Startup Legal Kit",
              icon: "fas fa-rocket",
              path: "/startup-legal-kit",
            },
            {
              name: "Virtual Legal Officer (VLO)",
              icon: "fas fa-user-tie",
              path: "/virtual-legal-officer",
            },
          ],
        },
        {
          name: "Compliance Package",
          icon: "fas fa-shield-alt",
          subDropdown: [
            {
              name: "GST Registration & Filing",
              icon: "fas fa-receipt",
              path: "/gst-compliance",
            },
            {
              name: "Annual Corporate Compliance",
              icon: "fas fa-building",
              path: "/annual-corporate-compliance",
            },
            {
              name: "Annual LLP Compliance",
              icon: "fas fa-handshake",
              path: "/annual-llp-compliance",
            },
            {
              name: "Accounting & Tax Services",
              icon: "fas fa-calculator",
              path: "/accounting-tax-services",
            },
            {
              name: "Labour Law Compliance",
              icon: "fas fa-users",
              path: "/labour-law-compliance",
            },
            {
              name: "POSH Compliance",
              icon: "fas fa-shield-alt",
              path: "/posh-compliance",
            },
            {
              name: "Business Changes & Updates",
              icon: "fas fa-edit",
              path: "/business-changes-updates",
            },
          ],
        },
      ],
    },
    {
      name: "Resources",
      icon: "fas fa-book",
      dropdown: [
        { name: "Kanoonwise Academy", icon: "fas fa-graduation-cap", path: "/academy" },
        { name: "Legal Insights", icon: "fas fa-lightbulb", path: "/legal-insights" },
        { name: "Document Templates", icon: "fas fa-file-alt", path: "/document-templates" },
      ],
    },
    {
      name: "About Us",
      icon: "fas fa-info-circle",
      path: "/about-us",
    },
    {
      name: "Stamp Paper",
      icon: "fas fa-stamp",
      path: "/stamps",
    },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-[80] transition-all duration-300 ${
        isHomepage
          ? isScrolled
            ? "bg-white shadow-lg"
            : "bg-white/10 backdrop-blur-md"
          : "bg-white shadow-lg"
      }`}
      style={{ height: "auto" }}
    >
      {/* Top Contact Bar */}
      {/* {!isScrolled && (
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
                className="hover:text-primary-300 transition-colors duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="hover:text-primary-300 transition-colors duration-300"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="#"
                className="hover:text-primary-300 transition-colors duration-300"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      )} */}

      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl font-sans">
                  K
                </span>
              </div>
              <span
                className={`text-2xl font-semibold tracking-tight font-sans ${
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
                  className={`flex items-center space-x-1 font-semibold text-sm transition-colors duration-200 ${
                    isHomepage
                      ? isScrolled
                        ? "text-gray-700 hover:text-primary-600"
                        : "text-white hover:text-primary-300"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  <span className="font-sans">{item.name}</span>
                  {item.dropdown && (
                    <i className="fas fa-chevron-down text-xs group-hover:rotate-180 transition-transform duration-200"></i>
                  )}
                </button>

                {/* Desktop Dropdown */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-[90]">
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem, dropIndex) => (
                        <div key={dropIndex} className="relative group/sub">
                          <button
                            onClick={() => handleDropdownClick(dropdownItem)}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-primary-600 transition-colors duration-200 w-full text-left font-medium"
                          >
                            <i
                              className={`${dropdownItem.icon} text-yellow-500 w-4`}
                            ></i>
                            <span className="font-sans">
                              {dropdownItem.name}
                            </span>
                            {dropdownItem.subDropdown && (
                              <i className="fas fa-chevron-right ml-auto text-xs"></i>
                            )}
                          </button>

                          {/* Desktop SubDropdown */}
                          {dropdownItem.subDropdown && (
                            <div className="absolute top-0 left-full mt-0 ml-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 transform translate-x-2 group-hover/sub:translate-x-0 z-[70]">
                              <div className="py-2">
                                {dropdownItem.subDropdown.map(
                                  (subItem, subIndex) => (
                                    <button
                                      key={subIndex}
                                      onClick={() =>
                                        handleDropdownClick(subItem)
                                      }
                                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-primary-600 transition-colors duration-200 w-full text-left font-medium"
                                    >
                                      <i
                                        className={`${subItem.icon} text-yellow-500 w-4`}
                                      ></i>
                                      <span className="font-sans">
                                        {subItem.name}
                                      </span>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
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
                        ? "text-gray-700 hover:text-primary-600"
                        : "text-white hover:text-primary-300"
                      : "text-gray-700 hover:text-primary-600"
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
                          ? "text-gray-700 hover:text-primary-600"
                          : "text-white hover:text-primary-300"
                        : "text-gray-700 hover:text-primary-600"
                    }`}
                  >
                    <i className="fas fa-user-circle"></i>
                    <span>{user?.email?.split("@")[0] || "User"}</span>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[70]">
                    <div className="py-2">
                      <button
                        onClick={handleDashboardNavigation}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-primary-600 w-full text-left"
                      >
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={() => handleNavigation("/my-appointments")}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-primary-600 w-full text-left"
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
                  Join as Lawyer
                </button>
                <button
                  onClick={() => handleNavigation("/login")}
                  className={`font-medium transition-colors duration-200 ${
                    isHomepage
                      ? isScrolled
                        ? "text-gray-700 hover:text-primary-600"
                        : "text-white hover:text-primary-300"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  Login
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
          } overflow-hidden z-[70]`}
        >
          <div className="py-4 space-y-4 bg-white rounded-lg shadow-lg mt-2 border border-gray-100 mx-4 z-[70]">
            {navItems.map((item, index) => (
              <div key={index} className="px-4">
                <button
                  onClick={() =>
                    item.path
                      ? handleNavigation(item.path)
                      : toggleDropdown(index)
                  }
                  className="flex items-center justify-between w-full text-gray-700 font-semibold py-3 border-b border-gray-100 hover:text-primary-600 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <i className={`${item.icon} text-yellow-600`}></i>
                    <span className="text-sm font-sans">{item.name}</span>
                  </div>
                  {item.dropdown && (
                    <i
                      className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
                        openDropdowns[index] ? "rotate-180" : ""
                      }`}
                    ></i>
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.dropdown && (
                  <div
                    className={`ml-6 space-y-2 mt-2 overflow-hidden transition-all duration-300 ${
                      openDropdowns[index]
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.dropdown.map((dropdownItem, dropIndex) => (
                      <div key={dropIndex} className="ml-2">
                        <button
                          onClick={() => {
                            // If this dropdown item has nested subDropdown, toggle it.
                            // Otherwise treat it as a navigable item (routeMap/name-based or path).
                            if (dropdownItem.subDropdown) {
                              toggleDropdown(`${index}-${dropIndex}`);
                            } else {
                              handleDropdownClick(dropdownItem);
                            }
                          }}
                          className="flex items-center justify-between w-full text-gray-600 hover:text-primary-600 hover:bg-yellow-50 py-3 px-2 rounded-lg transition-all duration-200 text-left min-h-[44px] font-medium"
                        >
                          <div className="flex items-center space-x-3">
                            <i
                              className={`${dropdownItem.icon} text-sm text-yellow-500`}
                            ></i>
                            <span className="text-sm font-sans">
                              {dropdownItem.name}
                            </span>
                          </div>
                          {dropdownItem.subDropdown && (
                            <i
                              className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
                                openDropdowns[`${index}-${dropIndex}`]
                                  ? "rotate-180"
                                  : ""
                              }`}
                            ></i>
                          )}
                        </button>

                        {/* Mobile SubDropdown */}
                        {dropdownItem.subDropdown && (
                          <div
                            className={`ml-6 space-y-1 mt-2 overflow-hidden transition-all duration-300 ${
                              openDropdowns[`${index}-${dropIndex}`]
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            {dropdownItem.subDropdown.map(
                              (subItem, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={() => handleDropdownClick(subItem)}
                                  className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 hover:bg-yellow-50 py-3 px-2 rounded-lg transition-all duration-200 w-full text-left min-h-[44px] font-medium"
                                >
                                  <i
                                    className={`${subItem.icon} text-sm text-yellow-500`}
                                  ></i>
                                  <span className="text-sm font-sans">
                                    {subItem.name}
                                  </span>
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth Section */}
            <div className="px-4 border-t border-gray-100 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <button
                    onClick={handleDashboardNavigation}
                    className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-primary-600 py-2"
                  >
                    <i className="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/my-appointments")}
                    className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-primary-600 py-2"
                  >
                    <i className="fas fa-calendar-alt"></i>
                    <span>My Appointments</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left text-red-600 hover:text-red-700 py-2 border-t border-gray-100"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => handleNavigation("/join-as-lawyer")}
                    className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-orange-600 py-2"
                  >
                    <i className="fas fa-balance-scale"></i>
                    <span>Join as Lawyer</span>
                  </button>
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-primary-600 py-2"
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Login</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
