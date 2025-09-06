import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import { Shield, Menu, X, User as UserIcon, LogOut, Home } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: "fas fa-tachometer-alt",
      path: "/admin/dashboard",
    },
    {
      name: "Lawyers",
      icon: "fas fa-balance-scale",
      path: "/admin/lawyers",
    },
    {
      name: "Users",
      icon: "fas fa-users",
      path: "/admin/users",
    },
    {
      name: "Settings",
      icon: "fas fa-cog",
      path: "/admin/settings",
    },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-light tracking-wide text-gray-900">
                Kanoonwise
              </span>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Admin
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center space-x-2 font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600"
              >
                <i className={`${item.icon} text-blue-500`}></i>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => handleNavigation("/")}
              className="font-medium transition-colors duration-200 flex items-center text-gray-700 hover:text-blue-600"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Site
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600">
                <UserIcon className="h-4 w-4" />
                <span>{user?.email?.split("@")[0] || "Admin"}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <button
                    onClick={() => handleNavigation("/admin/profile")}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left border-t border-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
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
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center space-x-3 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 w-full text-left"
              >
                <i className={`${item.icon} text-blue-600`}></i>
                <span className="text-base">{item.name}</span>
              </button>
            ))}

            <div className="px-4 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigation("/")}
                  className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-3 rounded-lg transition-all duration-200 flex items-center space-x-3"
                >
                  <Home className="h-5 w-5 text-blue-600" />
                  <span>Back to Site</span>
                </button>
                <button
                  onClick={() => handleNavigation("/admin/profile")}
                  className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-3 rounded-lg transition-all duration-200 flex items-center space-x-3"
                >
                  <UserIcon className="h-5 w-5 text-blue-600" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50 font-medium py-3 px-3 rounded-lg transition-all duration-200 flex items-center space-x-3 border-t border-gray-100 mt-3 pt-3"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
