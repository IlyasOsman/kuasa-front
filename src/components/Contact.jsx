import React, {useEffect, useState} from "react";
import styles from "../style";
import Button from "./Button";
import emailjs from "@emailjs/browser";
import {Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

export function Contact() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const serviceId = import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID;

  useEffect(() => emailjs.init("oWwQKdbdixDBJZO19"), []);

  const handleSubmit = (values, {resetForm}) => {
    emailjs.sendForm(serviceId, templateId, values, "oWwQKdbdixDBJZO19").then(
      (result) => {
        console.log(result.text);
        setMessage("Your message has been sent successfully!");
        setTimeout(() => setMessage(""), 5000);
        resetForm();
        alert("Email successfully sent check inbox");
      },
      (error) => {
        console.log(error.text);
        setErrorMessage(
          "Sorry, there was an error sending your message. \n Please try again later."
        );
        setTimeout(() => setErrorMessage(""), 5000);
      }
    );
  };

  const initialValues = {
    name: "",
    email: "",
    message: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required")
  });

  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.marginX}`}>
      <div className={`${styles.boxWidth} flex flex-col`}>
        <div className="flex-1 lg:flex lg:items-center lg:-mx-3">
          <div className="text-white lg:w-1/2 lg:mx-3">
            <h1 className="text-2xl font-semibold capitalize lg:text-3xl">Contact us here</h1>

            <p className="max-w-xl mt-3">
              Do you have any questions, suggestions or want to be our patners. Contact us through
              here.
            </p>

            <div className="mt-6 space-y-8 md:mt-8">
              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#33bbcf"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span className="mx-2 text-white truncate w-72">
                  Kenyatta University, 43844, Thika road, Nairobi.
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#33bbcf"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <span className="mx-2 text-white truncate w-72">(+254) 797-344-147</span>
              </p>

              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-white"
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

                <span className="mx-2 text-white truncate w-72">kuasaofficial@gmail.com</span>
              </p>
            </div>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden shadow-2xl rounded-xl bg-gray-900 lg:max-w-xl">
              <div className="flex justify-content-center">
                {message && (
                  <p className="successs-message" style={{color: "green"}}>
                    {message}
                  </p>
                )}
                {errorMessage && (
                  <p className="error-message" style={{color: "red"}}>
                    {errorMessage}
                  </p>
                )}
              </div>

              <h1 className="text-xl font-medium text-gray-200">Contact form</h1>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <div className="mt-4">
                    <div className="flex-1">
                      <label className="block mb-2 text-sm text-gray-200">Full Name</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="block w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500" />
                    </div>

                    <div className="flex-1 mt-6">
                      <label className="block mb-2 text-sm text-gray-200">Email address</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="block w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>

                    <div className="w-full mt-6">
                      <label className="block mb-2 text-sm text-gray-200">Message</label>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Message"
                        className="block w-full h-32 px-5 py-3 mt-2 placeholder-gray-400 border rounded-md md:h-48 bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
                      />
                      <ErrorMessage name="message" component="div" className="text-red-500" />
                    </div>
                    <Button
                      type="submit"
                      text="Submit"
                      styles="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide"
                    />
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
