import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const NavMenu = ({ logoutHandler }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div>
      <button
        onClick={toggleMenu}
        className="flex items-center hover:bg-gradient-to-r from-pink-400 cursor-pointer to-pink-800  p-3 rounded-2xl md:p-4 text-gray-800 focus:outline-none"
      >
        {userInfo ? (
          <span className="text-white cursor-pointer text-xs lg:text-base">
            {userInfo.username}
          </span>
        ) : (
          <></>
        )}
        {userInfo && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 ${isMenuOpen ? "rotate-180" : "rotate-0"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
        )}
      </button>

      {isMenuOpen && userInfo && (
        <ul
          className={`absolute -right-10 lg:-right-6 mt-2 mr-14 space-y-2 px-3 py-2 rounded-lg text-white bg-[#151515] top-10 `}
          ref={menuRef}
        >
          {userInfo.isAdmin && (
            <>
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "text-green-400 font-bold"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/allproductslist"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "text-green-400 font-bold"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/categorylist"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "text-green-400 font-bold"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/orderlist"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "text-green-400 font-bold"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/userslist"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "text-green-400 font-bold"
                        : "hover:bg-gray-700"
                    }`
                  }
                >
                  Users
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "text-green-400 font-bold" : "hover:bg-gray-700"
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <button
              onClick={logoutHandler}
              className="block w-full px-4 py-2 rounded-lg text-left hover:bg-gray-700 text-white cursor-pointer"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
export default NavMenu;
