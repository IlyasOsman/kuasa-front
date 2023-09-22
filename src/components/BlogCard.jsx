import React, {useState} from "react";
import {demoimage} from "../assets";
import styles from "../style";

const BlogCard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="flex rounded-md transition hover:shadow-xl bg-gray-900 shadow-gray-800/25"
      onClick={() => setShowModal(true)}
    >
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time
          dateTime="2022-10-10"
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-white"
        >
          <span>2022</span>
          <span className="w-px flex-1 bg-gray-900/10 dark:bg-white/10"></span>
          <span>Oct 10</span>
        </time>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <img alt="Guitar" src={demoimage} className="aspect-square h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 dark:border-white/10 sm:!border-l-transparent sm:p-6">
          <a href="#">
            <h3 className="font-bold uppercase text-gray-900 dark:text-white">
              Finding the right for your style - 5 tips
            </h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
            pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
            quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
            atque dignissimos. Molestias explicabo corporis voluptatem?
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <a
            href="#"
            className="block bg-blue-gradient px-5 py-3 text-center text-xs font-bold uppercase text-gray-900"
          >
            Read Blog
          </a>
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
                  <h3 className="text-3xl font-semibold text-white">Blog title goes here</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                          fill="rgba(255,255,255,1)"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto  max-h-[70vh] overflow-y-auto">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img src={demoimage} alt="image" loading="lazy" />
                  </div>
                  <h2 className="text-secondary mt-2">TLDR</h2>
                  <p className="my-4 mt-4 text-slate-500 leading-relaxed">
                    pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet
                    corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo
                    tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis
                    voluptatem? pariatur animi temporibus nesciunt praesentium dolore sed nulla
                    ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo
                    corporis voluptatem?
                  </p>
                  <h2 className="text-secondary">Authors</h2>
                  <p className="my-4 text-slate-500 leading-relaxed">
                    Authors 1, Authors 2 and Author 3
                  </p>
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
};

export default BlogCard;
