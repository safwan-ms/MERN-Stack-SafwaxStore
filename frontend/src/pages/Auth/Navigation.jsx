import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { useNavigate } from "react-router";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/Auth/authSlice.js";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

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
      <nav className="flex justify-between px-10 fixed bg-gradient-to-r from-pink-900 to-pink-500 w-full p-4 text-2xl pl-20">
        <Link to={"/"}> Safwax Store</Link>
        <button
          onClick={toggleDropdown}
          className="flex text-base items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white cursor-pointer ">
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
            className={`absolute  mt-2 mr-14 space-y-2 text-white bg-gray-800 top-10 right-0.5`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 text-xs py-2 hover:bg-gray-300 shadow-inner shadow-gray-950 hover:text-black"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2  text-xs hover:bg-gray-100 hover:text-black"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 text-xs hover:bg-gray-100 hover:text-black"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 text-xs hover:bg-gray-100 hover:text-black"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 text-xs hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/admin/profile"
                className="block px-4 py-2 text-xs hover:bg-gray-100 hover:text-black"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block px-4 py-2 text-xs hover:bg-gray-100 hover:text-black"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
      <div
        style={{ zIndex: 9999 }}
        className={`${
          showSidebar ? "hidden" : "flex"
        }  xl:flex lg:flex flex-col justify-between md:p-2 p-1 xl:p-3  text-white bg-[#000] w-[10%] lg:hover:w-[15%] h-[100vh]  fixed `}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
          {/* Home */}
          <NavLink
            to="/"
            className={` flex items-center transition-transform transform hover:translate-x-2 hover:bg-pink-500`}
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem] text-white">
              HOME
            </span>
          </NavLink>

          {/* Shopping */}
          <NavLink
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem] text-white">
              SHOP
            </span>
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem] text-white">
              CART
            </span>
          </NavLink>

          {/* Favorite */}
          <NavLink
            to="/favorite"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaHeart className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem] cursor-pointer text-white">
              FAVORITE
            </span>
          </NavLink>
        </div>

        {userInfo && (
          <NavLink
            to="/"
            className={` flex items-center transition-transform transform hover:translate-x-2 hover:bg-pink-500`}
          >
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem] text-white">
              Logout
            </span>
          </NavLink>
        )}

        {!userInfo && (
          <ul>
            {/* Login  */}
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem] text-white">
                  Login
                </span>
              </Link>
            </li>

            {/* Register */}
            <li>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem] text-white">
                  Register
                </span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default Navigation;
