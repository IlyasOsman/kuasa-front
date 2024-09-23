import React, {useState, useEffect} from "react";
import PhotoCard from "../components/PhotoCard";
import styles from "../style";
import Loader from "../components/Loader";
import NotFoundpage from "../pages/NotFoundpage";

const apiKey = import.meta.env.VITE_REACT_APP_NASA_API_KEY;

export const POTD = () => {
  const [blogData, setBlogData] = useState([]);
  const [apiError, setApiError] = useState(false);
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
        setApiError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setApiError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className={`${styles.marginX} ${styles.flexCenter} bg-primary`}>
      <div className={`container ${styles.boxWidth} ${styles.marginY}`}>
        <div className="flex py-4 mt-4 overflow-x-hidden overflow-y-hidden md:justify-center dark:border-gray-700">
          Photo Of The Day
        </div>
        {isLoading ? (
          <Loader />
        ) : apiError ? (
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
        )}
      </div>
    </section>
  );
};
