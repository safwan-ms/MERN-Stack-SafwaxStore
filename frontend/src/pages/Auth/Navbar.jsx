import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
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
            className={`absolute right-13 mt-2 mr-14 space-y-2 text-white bg-gray-800`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 text-xs py-2 hover:bg-gray-300 hover:text-black"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 text-xs py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 text-xs py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 text-xs py-2 hover:bg-gray-100 hover:text-black"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 text-xs py-2 hover:bg-gray-100"
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
              <Link
                to="/admin/logout"
                onClick={logoutHandler}
                className="block px-4 py-2 text-xs hover:bg-gray-100 hover:text-black"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
export default Navbar;
