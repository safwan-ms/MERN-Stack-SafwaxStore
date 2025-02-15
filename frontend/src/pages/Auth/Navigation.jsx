import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoExitOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/Auth/authSlice.js";
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        onMouseLeave={() => setDropdownOpen(false)}
        className="flex justify-between items-center px-4 lg:px-10 fixed bg-gradient-to-r from-pink-900 to-pink-500 w-full py-3 lg:py-4 z-50"
      >
        <button className="flex items-center text-base md:text-lg lg:text-xl gap-3 text-white">
          <GiHamburgerMenu
            onClick={() => setShowSidebar(!showSidebar)}
            className="cursor-pointer"
          />
          <NavLink to={"/"}>Safwax Store</NavLink>
        </button>
        <button
          onMouseEnter={() => setDropdownOpen(true)}
          className="flex items-center text-gray-800 focus:outline-none"
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
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul
            className={`absolute -right-10 lg:-right-6 mt-2 mr-14 space-y-2 px-3 py-2 rounded-lg text-white bg-[#151515] top-10 `}
            onMouseLeave={toggleDropdown}
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
        {!userInfo && (
          <ul className="flex gap-1">
            <li>
              <NavLink
                to="/login"
                className="flex items-center  transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </NavLink>
            </li>
          </ul>
        )}
      </nav>

      {/* Sidebar Overlay for Mobile */}
      {showSidebar && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-black text-white p-4 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-[70%] lg:w-[15%] z-50`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={() => setShowSidebar(false)}
          className="absolute top-2 right-2 text-white text-2xl lg:hidden"
        >
          ✖
        </button>

        <div className="flex flex-col justify-between h-screen pb-16 pt-10  space-y-6">
          <div>
            <NavLink
              to="/"
              className="hover-effect flex items-center gap-3 py-3 hover:text-pink-400 hover:translate-x-2"
            >
              <AiOutlineHome size={26} /> <span>HOME</span>
            </NavLink>

            <NavLink
              to="/shop"
              className="flex items-center gap-3 py-3 hover:text-pink-400 hover:translate-x-2"
            >
              <AiOutlineShopping size={26} /> <span>SHOP</span>
            </NavLink>

            <NavLink
              to="/cart"
              className="flex items-center gap-3  py-3 hover:text-pink-400 hover:translate-x-2"
            >
              <AiOutlineShoppingCart size={26} /> <span>CART</span>
            </NavLink>

            <NavLink
              to="/favorite"
              className="hover-effect  flex items-center gap-3  py-3 hover:text-pink-400 hover:translate-x-2 "
            >
              <FaHeart size={26} /> <span>FAVORITE</span>
            </NavLink>
          </div>
          <div>
            {userInfo ? (
              <button
                onClick={logoutHandler}
                className="flex items-center gap-3  py-3 text-red-400 hover:text-red-600"
              >
                <IoExitOutline size={26} /> <span>LOGOUT</span>
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="hover-effect flex items-center py-3 gap-3 hover:text-pink-400 hover:translate-x-2"
                >
                  <AiOutlineLogin size={26} /> <span>LOGIN</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center gap-3 hover:text-pink-400 hover:translate-x-2"
                >
                  <AiOutlineUserAdd size={26} /> <span>REGISTER</span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navigation;
