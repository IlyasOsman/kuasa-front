import React, {useState} from "react";
import {eye, eyeOff, logo} from "../assets";
import styles from "../style";
import Button from "./Button";
import {Link} from "react-router-dom";

export function SignIn() {
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
        <form className="mt-4">
          <img className="w-auto h-7 sm:h-8" src={logo} alt="kuasa" />

          <h1 className="mt-3 text-2xl font-semibold capitalize sm:text-3xl text-white">Sign In</h1>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#33bbcf"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Email address"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#33bbcf"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              type={type}
              className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Password"
            />
            <span onClick={handleToggle} className="absolute right-3 cursor-pointer">
              <img src={icon} sizes={25} alt="show" />
            </span>
          </div>

          <a
            href="#"
            className="inline-block mt-4 text-blue-500 capitalize hover:underline dark:text-blue-400"
          >
            Forgot Password?
          </a>

          <div className="mt-6">
            <Button text="Sign in" styles="w-full px-6 py-3 text-sm  tracking-wide rounded-md" />
            <p className="mt-4 text-center text-gray-400">or sign in with</p>

            <a
              href="#"
              className="flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-md border-gray-700 text-gray-200 hover:bg-gray-600"
            >
              <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>

              <span className="mx-2">Sign in with Google</span>
            </a>

            <div className="mt-6 text-center ">
              <Link to="/signup" className="text-sm hover:underline text-blue-400">
                Don’t have an account yet? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
