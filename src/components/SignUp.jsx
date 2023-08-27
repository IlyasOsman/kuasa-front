import React, {useState} from "react";
import {eye, eyeOff, logo} from "../assets";
import styles from "../style";

import {Link} from "react-router-dom";
import Button from "./Button";

export function SignUp() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <section className={`bg-primary ${styles.flexCenter} ${styles.marginX} ${styles.marginY}`}>
      <div
        className={`w-full px-8 py-10 mx-auto overflow-hidden shadow-2xl rounded-xl bg-gray-900 lg:max-w-xl `}
      >
        <img className="w-auto h-7 sm:h-8" src={logo} alt="kuasa" />
        <h1 className="mt-3 text-2xl font-semibold capitalize sm:text-3xl text-white">Sign Up</h1>
        <p className="mt-4 text-gray-400">
          Let’s get you all set up so you can verify your personal account and begin setting up your
          profile.
        </p>
        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm text-gray-200">First Name</label>
            <input
              type="text"
              placeholder="John"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-200">Last name</label>
            <input
              type="text"
              placeholder="Snow"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-200">Phone number</label>
            <input
              type="text"
              placeholder="XXX-XX-XXXX-XXX"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-200">Email address</label>
            <input
              type="email"
              placeholder="jsnow@students.ku.ac.ke"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="relative">
            <label className="block mb-2 text-sm text-gray-200">Password</label>
            <input
              type={type}
              placeholder="Enter your password"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <span
              onClick={handleToggle}
              className="absolute top-2/3 right-3 transform -translate-y-1/2 cursor-pointer"
            >
              <img src={icon} sizes={25} alt="show" />
            </span>
          </div>

          <div className="relative">
            <label className="block mb-2 text-sm text-gray-200">Password</label>
            <input
              type={type}
              placeholder="Confirm your password"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <span
              onClick={handleToggle}
              className="absolute top-2/3 right-3 transform -translate-y-1/2 cursor-pointer"
            >
              <img src={icon} sizes={25} alt="show" />
            </span>
          </div>
          <Button
            text="Sign Up"
            styles="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide"
          />
          <div className="mt-6 text-center ">
            <Link to="/signin" className="text-sm hover:underline text-blue-400">
              Already have an account yet? Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
