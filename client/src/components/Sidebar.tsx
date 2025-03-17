import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { path: "/", label: "Home", color: "bg-indigo-600 hover:bg-indigo-700" },
    {
      path: "/admin",
      label: "Admin",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-indigo-300 mb-8">Blog App</h2>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? `${item.color} text-white`
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setIsOpen(false)} // Close sidebar on click in mobile
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
