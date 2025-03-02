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
import NavMenu from "./NavMenu.jsx";
import FavoritesCount from "../Products/FavoritesCount.jsx";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

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
      <nav className="flex justify-between items-center px-4 lg:px-10 fixed bg-gradient-to-r from-pink-900 py-2 to-pink-500 w-full z-50">
        <button className="flex items-center text-base md:text-lg lg:text-xl gap-3 text-white">
          <GiHamburgerMenu
            onClick={() => setShowSidebar(!showSidebar)}
            className="cursor-pointer"
          />
          <NavLink to={"/"}>Safwax Store</NavLink>
        </button>
        <NavMenu logoutHandler={logoutHandler} />

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
              className="flex relative items-center gap-3  py-3 hover:text-pink-400 hover:translate-x-2"
            >
              <AiOutlineShoppingCart size={26} /> <span>CART</span>
              <div className="absolute top-0 right-32 ">
                {cartItems.length > 0 && (
                  <span>
                    <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/favorite"
              className="hover-effect relative flex items-center gap-3  py-3 hover:text-pink-400 hover:translate-x-2 "
            >
              <FaHeart size={26} /> <span>FAVORITE</span> <FavoritesCount />
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
