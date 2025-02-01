import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/Auth/authSlice.js";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } hidden xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-2 xl:p-3 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        {/* Home */}
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem] text-white">
            HOME
          </span>
        </Link>

        {/* Shopping */}
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem] text-white">
            SHOP
          </span>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem] text-white">
            CART
          </span>
        </Link>

        {/* Favorite */}
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem] text-white">
            FAVORITE
          </span>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {" "}
          {userInfo ? (
            <span className="text-white"> {userInfo.username}</span>
          ) : (
            <></>
          )}
        </button>
      </div>

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
    </div>
  );
};
export default Navigation;
