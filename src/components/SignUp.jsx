import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {eye, eyeOff, logo} from "../assets";
import styles from "../style";
import {Link, useNavigate} from "react-router-dom";
import Button from "./Button";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

export function SignUp() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(/ku.ac.ke$/, "Email must end with ku.ac.ke"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match")
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${kuasaApi}/api/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          toast.success("Registration successful", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
          });

          setTimeout(() => {
            navigate("/email-verification");
          }, 3000);
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          formik.setErrors(errorData);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  });

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
        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block mb-2 text-sm text-gray-200">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="John"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <small className="text-red-500 mt-2">{formik.errors.first_name}</small>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-200">Last name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Snow"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <small className="text-red-500 mt-2">{formik.errors.last_name}</small>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-200">username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <small className="text-red-500 mt-2">{formik.errors.username}</small>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-200">email address</label>
            <input
              type="email"
              name="email"
              placeholder="jsnow@students.ku.ac.ke"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-red-500 mt-2">{formik.errors.email}</small>
            )}
          </div>

          <div className="relative">
            <label className="block mb-2 text-sm text-gray-200">Password</label>
            <input
              type={type}
              name="password"
              placeholder="Enter your password"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-red-500 mt-2">{formik.errors.password}</small>
            )}
            <span
              onClick={handleToggle}
              className="absolute top-2/3 right-3 transform -translate-y-1/2 cursor-pointer"
            >
              <img src={icon} sizes={25} alt="show" />
            </span>
          </div>

          <div className="relative">
            <label className="block mb-2 text-sm text-gray-200">Confirm Password</label>
            <input
              type={type}
              name="confirm_password"
              placeholder="Confirm your password"
              className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
            />
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <small className="text-red-500 mt-2">{formik.errors.confirm_password}</small>
            )}
            <span
              onClick={handleToggle}
              className="absolute top-2/3 right-3 transform -translate-y-1/2 cursor-pointer"
            >
              <img src={icon} sizes={25} alt="show" />
            </span>
          </div>
          <Button
            text="Sign Up"
            type="submit"
            styles="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide"
          />
          <div className="mt-6 text-center ">
            <Link to="/signin" className="text-sm hover:underline text-blue-400">
              Already have an account yet? Sign in
            </Link>
          </div>
        </form>

        <ToastContainer />
      </div>
    </section>
  );
}
