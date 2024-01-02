import React, {useState} from "react";
import {close, logo, menu} from "../assets";
import {Link, NavLink} from "react-router-dom";
import Button from "./Button";
import {useAuth} from "../contexts/AuthContext";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const {user, logout} = useAuth(); // Use useAuth to access user

  const handleLinkClick = () => {
    // Close the toggle when a link is clicked
    if (toggle) {
      setToggle(false);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    setActive("Home"); // Reset the active tab
  };

  const navLinks = [
    {
      title: "Home",
      path: "/home"
    },
    {
      title: "Blog",
      path: "/blog"
    },
    {
      title: "Events",
      path: "/events"
    },
    {
      title: "Contact",
      path: "/contact"
    }
  ];

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to="/home">
        <img src={logo} alt="kuasa" className="w-[124px] h-[32px]" />
      </Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <NavLink
            to={nav.path}
            key={index}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-secondary" : "text-white"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => {
              setActive(nav.title);
              handleLinkClick(); // Call the handleLinkClick function
            }}
          >
            {nav.title}
          </NavLink>
        ))}
        {user ? (
          // If user is logged in, show username and dropdown menu
          <div className="relative ml-7 cursor-pointer">
            <span className="text-secondary cursor-pointer" onClick={() => setToggle(!toggle)}>
              {user.username} ▼ {/* Unicode triangle for dropdown arrow */}
            </span>
            {toggle && (
              <div className="absolute right-0 mt-4 py-2 bg-primary text-white rounded shadow-md z-[10000]">
                <Link
                  to="/profile" // Link to user profile page
                  className="block px-6 py-2 hover:bg-gray-900 hover:text-secondary"
                  onClick={handleLinkClick}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout} // Use the handleLogout function
                  className="block w-full text-left px-6 py-2 hover:bg-gray-900 hover:text-secondary"
                >
                  Log&nbsp;Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // If user is not logged in, show "Log in" button
          <NavLink to="/signin" className="ml-7 cursor-pointer">
            <Button text="Log in" />
          </NavLink>
        )}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center z-[100]">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <NavLink
                to={nav.path}
                key={index}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${
                  active === nav.title ? "text-secondary" : "text-white"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-5"}`}
                onClick={() => {
                  setActive(nav.title);
                  handleLinkClick(); // Call the handleLinkClick function
                }}
              >
                {nav.title}
              </NavLink>
            ))}
            {user ? (
              // If user is logged in, show username and dropdown menu
              <div className="mt-5">
                <span className="text-secondary cursor-pointer" onClick={() => setToggle(!toggle)}>
                  {user.username} ▼ {/* Unicode triangle for dropdown arrow */}
                </span>
                {toggle && (
                  <div className="mt-2 py-2  bg-primary text-white rounded shadow-md">
                    <Link
                      to="/profile" // Link to user profile page
                      className="block px-4 py-2  hover:bg-gray-900 hover:text-secondary"
                      onClick={handleLinkClick}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout} // Use the handleLogout function
                      className="block w-full text-left px-4 py-2  hover:bg-gray-900 hover:text-secondary"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If user is not logged in, show "Log in" button
              <NavLink
                className="mt-4"
                to="/signin"
                onClick={() => {
                  setActive(true);
                  handleLinkClick(); // Call the handleLinkClick function
                }}
              >
                <Button text="Log in" />
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
