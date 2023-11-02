import React, {useEffect, useState} from "react";
import styles from "../style";
import {EventCard} from "../components/EventCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useAuth} from "../contexts/AuthContext";
import Loader from "../components/Loader";

export const Events = () => {
  const {accessToken, user} = useAuth();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const eventsPerPage = 6;

  const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: new Date(),
    location: "",
    host: "",
    cover_image: null
  });

  useEffect(() => {
    setPageLoading(true);
    // Fetch data from the API
    fetch(`${kuasaApi}/api/events/`)
      .then((response) => response.json())
      .then((data) => {
        setPageLoading(false);
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPageLoading(false);
      });
  }, []);

  if (pageLoading) {
    return <Loader />;
  }

  const fetchEvents = () => {
    fetch(`${kuasaApi}/api/events/`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      cover_image: file
    });
  };

  function formatEventDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const offset = "+03:00";

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
  }

  const handleAddEvent = () => {
    if (formData.cover_image === null) {
      alert("Please select a cover image (JPEG or PNG).");
      return;
    }

    const allowedExtensions = ["jpg", "jpeg", "png"];
    const extension = formData.cover_image.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      alert("Invalid file format. Please select a JPEG or PNG image.");
      return;
    }

    const formattedDate = formatEventDate(formData.event_date);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("event_date", formattedDate);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("host", formData.host);
    formDataToSend.append("cover_image", formData.cover_image);

    setLoading(true);

    fetch(`${kuasaApi}/api/events/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formDataToSend
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          fetchEvents();
          setLoading(false);
        } else {
          // Handle the error case here.
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className={`${styles.marginX} ${styles.flexCenter}`}>
        <div
          className={`${styles.boxWidth} ${styles.paddingY} mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8`}
        >
          {currentEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              eventDate={event.event_date}
              location={event.location}
              host={event.host}
              coverImage={event.cover_image}
              slug={event.slug}
            />
          ))}
        </div>
      </div>

      <div className={`flex justify-end mt-4 ${styles.flexCenter}`}>
        {events.length >= 6 && (
          <>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-blue-500 text-white px-4 py-2 rounded-l ${
                currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Prev
            </button>
            <div>{`${currentPage} of ${totalPages}`}</div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`bg-blue-500 text-white px-4 py-2 rounded-r ${
                currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Next
            </button>
          </>
        )}
        {user && user.is_staff && (
          <>
            <button
              onClick={() => setShowModal(true)}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg mx-2`}
            >
              Add Event
            </button>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="bg-gray-800 w-auto my-6 mx-auto max-w-3xl p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Add Event</h2>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="block w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              />
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="block w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              />
              <DatePicker
                selected={formData.event_date}
                onChange={(date) => setFormData({...formData, event_date: date})}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={30}
                dateFormat="yyyy-MM-dd hh:mm aa"
                className="block w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              />
              <input
                type="text"
                name="host"
                value={formData.host}
                onChange={handleInputChange}
                placeholder="Host"
                className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              />
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleCoverImageChange}
                className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              />
              {loading ? (
                <Loader />
              ) : (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddEvent}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mx-2"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
