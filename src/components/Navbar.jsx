import React, {useState} from "react";

import {close, logo, menu} from "../assets";
import {Link, NavLink} from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const handleLinkClick = () => {
    // Close the toggle when a link is clicked
    if (toggle) {
      setToggle(false);
    }
  };

  const navLinks = [
    {
      title: "Home",
      path: "/landingpage"
    },
    {
      title: "Projects",
      path: "/projects"
    },
    {
      title: "Blog",
      path: "/blog"
    },
    {
      title: "Contact",
      path: "/contact"
    }
  ];

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to="/landingpage">
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
        <NavLink to="/signin" className="ml-7 cursor-pointer">
          <Button text="Log in" />
        </NavLink>
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
            <NavLink
              to="/signin"
              className="mt-5 cursor-pointer"
              onClick={() => {
                setActive(true);
                handleLinkClick(); // Call the handleLinkClick function
              }}
            >
              <Button text="Log in" />
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
