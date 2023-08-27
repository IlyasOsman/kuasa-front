import React, {useState} from "react";
import styles from "../style";

// eslint-disable-next-line react/prop-types
export default function PhotoCard({url, title, explanation, date, hdurl}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <section>
      <div
        className="block rounded-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-black-gradient-2 hover:bg-primary border border-gray-300  hover:border-cyan-500"
        onClick={() => setShowModal(true)}
      >
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img className="rounded-t-md h-48 w-full" src={url} alt="image" loading="lazy" />
        </div>

        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-white capitalize truncate">
            {title}
          </h5>
          <p className="mb-4 text-base text-white truncate">{explanation}</p>
        </div>
      </div>

      {showModal && (
        <>
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${styles.marginX}`}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full  bg-gray-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-white">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#33bbcf"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="#33bbcf"
                        className="h-6 w-6"
                      >
                        <path d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto  max-h-[70vh] overflow-y-auto">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img src={hdurl} alt="image" loading="lazy" />
                  </div>
                  <h2 className="text-secondary">Explanation</h2>
                  <p className="my-4 mt-4 text-slate-500 leading-relaxed">{explanation}</p>
                  <h2 className="text-secondary">Date Taken</h2>
                  <p className="my-4 text-slate-500 leading-relaxed">{date}</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-secondary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </section>
  );
}
