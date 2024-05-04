import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    localStorage.clear();
    // localStorage.removeItem("email");
    // localStorage.removeItem("username");
    // localStorage.removeItem("token");
    // localStorage.removeItem("contact_number");
    // localStorage.removeItem("role");
    props?.onLogout();
  };

  return (
    <>
      <nav className="z-50 sticky top-0 w-full bg-white border-gray-200 flex justify-between px-4 lg:px-6 py-2.5 md:px-4 items-center">
        <Link to="/" className="flex items-center">
          <img src="./imgs/logo.jpg" className="mr-3 h-12" alt="Logo" />
        </Link>
        <div className="md:hidden pr-4">
          <button
            className="bg-orange-700 text-white py-2 px-4 rounded-lg"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <ul
          className={`hidden md:flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ${
            showMenu ? "hidden" : ""
          } flex-no-wrap`}
        >
          <li>
            <NavLink
              to="/"
              className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
              activeClassName="text-orange-700"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
              activeClassName="text-orange-700"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="block py-2 pr-4 pl-3 duration-200 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
              activeClassName="text-orange-700"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center lg:order-2">
          {!props?.user ? (
            <div className="flex">
              {/* Login */}
              <div className="mr-2">
                <NavLink
                  to="/login"
                  className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </NavLink>
              </div>
              {/* Register */}
              <div className="mr-2">
                <NavLink
                  to="/register"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Register
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center px-3">
              <p className="text-lg text-gray-800 font-medium mr-4">
                {/* Welcome User message */}
                Welcome{" "}
                <strong className="text-orange-700">
                  {props?.user?.username}!
                </strong>
              </p>
              {/* Logout button */}
              <div className="mr-2">
                <div
                  onClick={logout}
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Logout
                </div>
              </div>
            </div>
          )}
          {/* Cart item count */}
          {props?.user && (
            <Link
              to="/cart"
              className="cursor-pointer flex items-center text-2xl font-bold bg-orange-700 text-white p-2 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {props.count > 0 && (
                <div>
                  <sup>{props.count}</sup>
                </div>
              )}
            </Link>
          )}
        </div>
      </nav>
      <div className={`md:hidden ${showMenu ? "block" : "hidden"}`}>
        <ul className="bg-white border-t border-gray-200">
          <li>
            <NavLink
              to="/"
              className="block py-2 pl-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="block py-2 pl-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="block py-2 pl-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
