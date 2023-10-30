import React, {useState, useEffect} from "react";
import PhotoCard from "../components/PhotoCard";
import styles from "../style";
import {ComingSoon} from "./ComingSoon";
import NotFoundpage from "./NotFoundpage";
import Loader from "../components/Loader";

const apiKey = import.meta.env.VITE_REACT_APP_NASA_API_KEY;

export const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [activeTab, setActiveTab] = useState("photo");
  const [apiError, setApiError] = useState(false); // Track API error state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from NASA API
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=8`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data) => {
        setBlogData(data);
        setApiError(false); // Reset API error state
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setApiError(true); // Set API error state
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="bg-primary">
      <div className="container px-6 py-5 mx-auto">
        <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl text-white">
          Check out our latest Blog
        </h1>

        <div className="flex py-4 mt-4 overflow-x-hidden overflow-y-hidden md:justify-center dark:border-gray-700">
          <button
            className={`h-12 px-8 py-2 -mb-px text-sm text-center ${
              activeTab === "photo"
                ? "text-secondary bg-transparent border-b-2 border-blue-400"
                : "text-white bg-transparent border-b-2 border-gray-200"
            } sm:text-base whitespace-nowrap focus:outline-none`}
            onClick={() => setActiveTab("photo")}
          >
            Photo Of The Day
          </button>

          <button
            className={`h-12 px-8 py-2 -mb-px text-sm text-center ${
              activeTab === "blog"
                ? "text-secondary bg-transparent border-b-2 border-blue-400"
                : "text-white bg-transparent border-b-2 border-gray-200"
            } sm:text-base whitespace-nowrap cursor-pointer focus:outline-none`}
            onClick={() => setActiveTab("blog")}
          >
            Blog
          </button>
        </div>
        {isLoading ? ( // Display loader while isLoading is true
          <Loader />
        ) : activeTab === "photo" ? (
          // Display NotFoundpage component if there's an API error
          apiError ? (
            <NotFoundpage />
          ) : (
            <section className={`${styles.flexCenter}`}>
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
                {blogData.map((blogItem, index) => (
                  <PhotoCard
                    key={index}
                    title={blogItem.title}
                    url={blogItem.url}
                    date={blogItem.date}
                    explanation={blogItem.explanation}
                    hdurl={blogItem.hdurl}
                  />
                ))}
              </div>
            </section>
          )
        ) : (
          // Check for the active tab being "blog"
          <section>
            {/* blog */}
            <ComingSoon />
          </section>
        )}
      </div>
    </section>
  );
};
