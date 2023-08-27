import React, {useState} from "react";
import {faqsData} from "../constants";
import styles from "../style";
import {Link} from "react-router-dom";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null); // Initialize with null

  const toggleQuestion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the current question
    } else {
      setOpenIndex(index); // Open the clicked question
    }
  };

  return (
    <section className="bg-black-gradient-2 rounded-[20px] box-shadow relative mb-4">
      <div className="container px-6 py-12 mx-auto">
        <div className="absolute z-[0] w-[50%] h-[100%] -left-[40%] rounded-full blue__gradient bottom-40"></div>
        <h1 className="font-semibold text-center text-gray-800 lg:text-2xl dark:text-white">
          Frequently asked questions
        </h1>
        <div className="mt-8 space-y-8 lg:mt-12">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="p-8 bg-black-gradient-2 rounded-[20px] box-shadow hover:border-[1px]"
            >
              <button
                className="flex items-center justify-between w-full"
                onClick={() => toggleQuestion(index)}
              >
                <h1 className="font-semibold text-gray-500 dark:text-white">{faq.question}</h1>

                <span className="text-gray-400 bg-gray-200 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 transform ${
                      openIndex === index ? "rotate-45" : "rotate-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
              </button>

              {/* Display the answer if the question is open */}
              {openIndex === index && (
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        <p
          className={` ${styles.flexCenter}  mt-6 font-semibold text-gray-500 dark:text-white flex-wrap`}
        >
          Have more questions, kindly &nbsp;{" "}
          <Link to="/contact">
            <span className="text-blue-300 underline">Contact us</span> &nbsp; here.
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Faqs;
