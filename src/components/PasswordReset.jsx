import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "./Button";
import styles from "../style";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

const PasswordReset = () => {
  const {uidb64, token} = useParams();
  const [isValidToken, setIsValidToken] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Validate the token here
    fetch(`${kuasaApi}/api/password-reset/${uidb64}/${token}/`)
      .then((response) => {
        if (response.status === 200) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsValidToken(false);
      });
  }, [uidb64, token]);

  const handleSubmit = (values) => {
    const {password, confirmation} = values;

    if (password === confirmation && password.length >= 6) {
      const requestBody = {
        password,
        token,
        uidb64
      };

      fetch(`${kuasaApi}/api/password-reset-complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })
        .then((response) => {
          if (response.status === 200) {
            setIsSuccess(true);

            toast.success("Password Reset successful!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark"
            });

            setTimeout(() => {
              navigate("/signin");
            }, 3000);
          } else {
            setIsSuccess(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsSuccess(false);
        });
    }
  };

  return (
    <div>
      {isValidToken === true && !isSuccess && (
        <section id="content" role="section" className="bg-primary w-full max-w-md mx-auto p-6">
          <div className="mt-7 rounded-xl shadow-lg bg-gray-900">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-white">Reset Password</h1>
                <p className="mt-2 text-sm text-gray-400">
                  Enter and confirm your new password below.
                </p>
              </div>

              <div className="mt-5">
                <Formik
                  initialValues={{password: "", confirmation: ""}}
                  validationSchema={Yup.object({
                    password: Yup.string()
                      .required("Password is required")
                      .min(6, "Password must be at least 6 characters"),
                    confirmation: Yup.string()
                      .oneOf([Yup.ref("password"), null], "Passwords must match")
                      .required("Confirm Password is required")
                  })}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  <Form>
                    <div className="m-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                        placeholder="Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-sm text-red-600 mt-2"
                      />
                    </div>
                    <div className="m-2">
                      <label
                        htmlFor="confirmation"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        id="confirmation"
                        name="confirmation"
                        className="block w-full py-3 px-10 focus:ring-opacity-40 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage
                        name="confirmation"
                        component="div"
                        className="text-sm text-red-600 mt-2"
                      />
                    </div>
                    <Button
                      text="Reset Password"
                      type="submit"
                      styles="w-full px-6 py-3 text-sm tracking-wide rounded-md mt-2"
                    />
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* {isSuccess && navigate('/signin')} */}

      {isValidToken === false && (
        <div className={`${styles.flexCenter} ${styles.marginY} ${styles.marginX}`}>
          <div
            className={`border ${styles.paddingX} ${styles.paddingY} rounded-lg bg-black-gradient-2 box-shadow`}
          >
            <h2 className="text-white">Invalid link or has Expired.</h2>
            <p className="text-white">Request new one if you wish to reset you password.</p>
          </div>
        </div>
      )}

      {isValidToken === null && (
        <div className={`${styles.flexCenter} ${styles.marginY} ${styles.marginX}`}>
          <div
            className={`border ${styles.paddingX} ${styles.paddingY} rounded-lg bg-black-gradient-2 box-shadow`}
          >
            <p>Validating token...</p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PasswordReset;
