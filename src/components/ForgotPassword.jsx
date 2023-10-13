import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "./Button";
import {Link, useNavigate} from "react-router-dom";

const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 100000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required")
    }),
    onSubmit: async (values, {setStatus}) => {
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);

      try {
        const response = await fetch(`${kuasaApi}/api/forgot-password/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });
        const data = await response.json();
        setStatus(data.detail);
      } catch (error) {
        setStatus("An error occurred while resetting your password.");
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <section id="content" role="section" className="bg-primary w-full max-w-md mx-auto p-6">
      <div className="mt-7 rounded-xl shadow-lg bg-gray-900">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-white">Forgot password?</h1>
            <p className="mt-2 text-sm text-gray-400">
              Remember your password?
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium mx-3"
                to="/signin"
              >
                Login here
              </Link>
            </p>
            <br />
            <p>
              Enter your email address below, and we will send you a link to reset your password.
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                      placeholder="Email"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-sm text-red-600 mt-2">{formik.errors.email}</div>
                  ) : null}
                </div>
                {formik.status && (
                  <div className="text-sm text-green-600 mt-2">{formik.status}</div>
                )}
                <Button
                  text="Reset Password"
                  type="submit"
                  styles="w-full px-6 py-3 text-sm tracking-wide rounded-md"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-700">
        <span>Have an issue logging in?</span>
        <Link
          className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200 mx-2"
          to="/contact"
        >
          Contact us!
        </Link>
      </p>
    </section>
  );
};

export default ForgotPassword;
