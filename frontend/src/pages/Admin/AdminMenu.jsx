import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative cursor-pointer">
      {/* Animated Button */}
      <button
        className={`fixed bottom-5 right-5 bg-pink-500 p-3 cursor-pointer rounded-full z-50 transition-transform duration-300 ${
          isMenuOpen ? "rotate-180" : "rotate-0"
        }`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" size={20} />
        ) : (
          <FaBars color="white" size={20} />
        )}
      </button>

      {/* Popup Box */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed bottom-16 right-5 bg-[#151515] text-white w-64 p-4 rounded-lg shadow-lg transition-all duration-300 opacity-100 translate-y-0"
        >
          <h2 className="text-lg font-bold mb-2">Admin Menu</h2>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive ? "text-green-400 font-bold" : "hover:bg-gray-700"
                  }`
                }
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categorylist"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive ? "text-green-400 font-bold" : "hover:bg-gray-700"
                  }`
                }
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/productlist"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive ? "text-green-400 font-bold" : "hover:bg-gray-700"
                  }`
                }
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/allproductslist"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive ? "text-green-400 font-bold" : "hover:bg-gray-700"
                  }`
                }
              >
                All Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/userslist"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive ? "text-green-400 font-bold" : "hover:bg-gray-700"
                  }`
                }
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orderlist"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive ? "text-green-400 font-bold" : "hover:bg-gray-700"
                  }`
                }
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
