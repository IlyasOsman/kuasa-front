import React, {useState, useEffect} from "react";
import PhotoCard from "../components/PhotoCard";
import styles from "../style";
import NotFoundpage from "./NotFoundpage";
import Loader from "../components/Loader";
import {BlogCard} from "../components/BlogCard";
import AddBlog from "../components/AddBlog";
import {filterIcon, plusIcon} from "../assets";
import {useAuth} from "../contexts/AuthContext";

const apiKey = import.meta.env.VITE_REACT_APP_NASA_API_KEY;

export const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [activeTab, setActiveTab] = useState("blog");
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;
  const [kuasaBlogData, setKuasaBlogData] = useState([]);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

  const startIndex = (page - 1) * itemsPerPage;

  const {user} = useAuth();

  const openAddBlogModal = () => {
    setShowAddBlogModal(true);
  };

  const closeAddBlogModal = () => {
    setShowAddBlogModal(false);
  };

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

    // Fetch data from kuasaAPI/blogs/
    fetch(`${kuasaApi}/api/blogs/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from kuasaAPI");
        }
        return response.json();
      })
      .then((data) => {
        setKuasaBlogData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from kuasaAPI:", error);
        setIsLoading(false);
      });
  }, []);

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  const filteredBlogs = kuasaBlogData.filter((blogItem) => {
    const hasTitle = blogItem.title && typeof blogItem.title === "string";
    const hasDescription = blogItem.description && typeof blogItem.description === "string";
    return (
      (filterType === "All" || (filterType === "Projects" && blogItem.is_project)) &&
      ((hasTitle && blogItem.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (hasDescription && blogItem.description.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  const totalFilteredBlogs = filteredBlogs.length;
  const endIndex = Math.min(page * itemsPerPage, totalFilteredBlogs);
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const goToNextPage = () => {
    const nextPage = page + 1;
    const maxPages = Math.ceil(totalFilteredBlogs / itemsPerPage);

    if (nextPage <= maxPages) {
      setPage(nextPage);
    }
  };

  const goToPrevPage = () => {
    const prevPage = page - 1;
    if (prevPage >= 1) {
      setPage(prevPage);
    }
  };

  return (
    <section className={`${styles.marginX} ${styles.flexCenter} bg-primary`}>
      <div className={`container ${styles.boxWidth} ${styles.marginY}`}>
        <div className={`flex flex-col items-center lg:flex-row lg:justify-between mb-4`}>
          <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl text-white">
            Check out our latest Blog
          </h1>
          {user && (
            <button
              className="medium btn flex-row items-center border btn-tertiary text-sm mt-4 lg:mt-0"
              onClick={openAddBlogModal}
            >
              <span className="text-sm capitalize">Submit Blog</span>
              <img src={plusIcon} alt="Add blog" className="w-[24px] h-[24px] rounded-full ml-1" />
            </button>
          )}
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by title or description"
          className="px-4 py-2 border border-secondary text-white rounded-md bg-transparent"
        />

        <div className="flex py-4 mt-4 overflow-x-hidden overflow-y-hidden md:justify-center dark:border-gray-700">
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
        </div>
        {isLoading ? (
          <Loader />
        ) : activeTab === "photo" ? (
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
          <section>
            <section className={`mt-6`}>
              <div className="dropdown dropdown-right dropdown-end mb-4">
                <div tabIndex={0} role="button" className="btn m-1 capitalize bg-gray-900">
                  Filter
                  <img src={filterIcon} alt="filter" className="w-[24px] h-[24px] object-contain" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-gray-900"
                >
                  <li>
                    <a onClick={() => handleFilterChange("All")}>All</a>
                  </li>
                  <li>
                    <a onClick={() => handleFilterChange("Projects")}>Projects</a>
                  </li>
                </ul>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
                {currentBlogs.length === 0 ? (
                  <div className="text-center py-4">
                    <h4 className="text-lg font-semibold">{searchTerm} not found!</h4>
                    <p className="text-gray-500">
                      Try searching for a different blog or creating a new one.
                    </p>
                  </div>
                ) : (
                  currentBlogs.map((blogItem) => (
                    <BlogCard
                      key={blogItem.id}
                      title={blogItem.title}
                      upvotes={blogItem.upvotes}
                      comments={blogItem.comments}
                      link={blogItem.link}
                      cover_image={blogItem.cover_image}
                      is_project={blogItem.is_project}
                      created_at={blogItem.created_at}
                      slug={blogItem.slug}
                    />
                  ))
                )}
              </div>

              {totalFilteredBlogs > itemsPerPage && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={goToPrevPage}
                    disabled={page === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-l mx-2"
                  >
                    Previous
                  </button>
                  <button
                    onClick={goToNextPage}
                    disabled={endIndex >= totalFilteredBlogs}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                  >
                    Next
                  </button>
                </div>
              )}
            </section>
          </section>
        )}

        {/* Modal for adding a blog */}
        {showAddBlogModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-container">
              <AddBlog
                setShowModal={closeAddBlogModal}
                setKuasaBlogData={setKuasaBlogData}
                kuasaBlogData={kuasaBlogData}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
