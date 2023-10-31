import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "./Loader";
import styles from "../style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useAuth} from "../contexts/AuthContext";
import DOMPurify from "dompurify";

export const EventDetail = () => {
  const {slug} = useParams();
  const navigate = useNavigate();
  const {accessToken, user} = useAuth();

  const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCoverImage, setIsEditingCoverImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: new Date(),
    location: "",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    host: "",
    cover_image: null
  });

  useEffect(() => {
    // Fetch the event details using the slug
    fetch(`${kuasaApi}/api/events/${slug}/`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        // Initialize formData after fetching the event data
        setFormData({
          title: data.title,
          description: data.description,
          event_date: new Date(data.event_date),
          location: data.location,
          host: data.host,
          cover_image: data.cover_image
        });
      })
      .catch((error) => console.error("Error fetching event data: ", error));
  }, [slug]);

  if (!event) {
    return <Loader />;
  }

  const eventDate = event.event_date;

  const formatDate = (eventDate) => {
    const date = new Date(eventDate);

    // Apply the offset provided by the backend
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };

    const formattedDate = date.toLocaleString("en-US", options);
    return `${formattedDate}`;
  };

  const formattedDate = formatDate(eventDate);

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

  const handleDeleteEvent = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      fetch(`${kuasaApi}/api/events/delete/${slug}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => {
        if (response.status === 204) {
          navigate("/events");
        } else {
          console.error("Error deleting event");
        }
      });
    }
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditEvent = () => {
    setIsEditing(true);
  };

  // Function to handle the save button in the editing modal
  const handleSaveEdit = () => {
    const formattedDate = formatEventDate(formData.event_date);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("event_date", formattedDate);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("host", formData.host);

    setLoading(true);

    fetch(`${kuasaApi}/api/events/edit/${slug}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formDataToSend
    }).then((response) => {
      if (response.status === 200) {
        setIsEditing(false);
        // Refresh the event details to show the updated information
        setLoading(false);
        fetch(`${kuasaApi}/api/events/${slug}/`)
          .then((response) => response.json())
          .then((data) => setEvent(data))
          .catch((error) => console.error("Error fetching updated event data: ", error));
      } else {
        console.error("Error updating event");
        setLoading(false);
      }
    });
  };

  // Function to handle the cancel button in the editing modal
  const handleCancelEdit = () => {
    setIsEditing(false); // Close the editing modal without saving
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      cover_image: file
    });
  };

  // Function to send a PATCH request for cover image only
  const updateCoverImage = () => {
    if (formData.cover_image === null) {
      alert("Please select a cover image (JPEG or PNG).");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("cover_image", formData.cover_image);
    setLoading(true);
    fetch(`${kuasaApi}/api/events/edit/${slug}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formDataToSend
    }).then((response) => {
      if (response.status === 200) {
        setIsEditingCoverImage(false);
        setLoading(false);
        alert("Cover photo updated successfully.");
        fetch(`${kuasaApi}/api/events/${slug}/`)
          .then((response) => response.json())
          .then((data) => setEvent(data))
          .catch((error) => console.error("Error fetching updated event data: ", error));
      } else {
        console.error("Error updating cover photo");
        alert("Error updating cover photo");
        setIsEditingCoverImage(false);
        setLoading(false);
      }
    });
  };

  function sanitizeAndRenderDescription(description) {
    const sanitizedDescription = DOMPurify.sanitize(description);
    return {__html: sanitizedDescription};
  }

  return (
    <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} ${styles.paddingY}`}>
      {" "}
      {/* Apply boxWidth style */}
      <div className={`${styles.boxWidth}`}>
        {" "}
        {/* Center the content */}
        <div className="text-center">
          <h1 className={`${styles.heading2} ${styles.flexStart}`}>{event.title}</h1>
          <img
            src={event.cover_image}
            alt="Event Cover"
            className="my-4 cursor-pointer"
            onClick={() => setIsEditingCoverImage(true)}
          />{" "}
          <p className="text-white text-left">
            <strong>Date :</strong> {formattedDate}
          </p>
          <p className="text-white text-left">
            <strong>Location : </strong> {event.location}
          </p>
          <p
            className={`${styles.paragraph} text-left`}
            style={{whiteSpace: "pre-wrap"}}
            dangerouslySetInnerHTML={sanitizeAndRenderDescription(
              `<strong class="text-white">Description</strong><br />${event.description}`
            )}
          />
          <p className="text-white text-left mt-4">
            <strong>Hosted together with : </strong> <span className="italic">{event.host}</span>
          </p>
        </div>
        {user && user.is_staff && (
          <>
            {loading ? (
              <Loader />
            ) : (
              <div className="flex justify-end items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="mx-2 cursor-pointer"
                  onClick={handleEditEvent}
                  width="24"
                  height="24"
                >
                  <path
                    d="M5 18.89H6.41421L15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89ZM21 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L9.24264 18.89H21V20.89ZM15.7279 6.74786L17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786Z"
                    fill="rgba(51,187,207,1)"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="mx-2 cursor-pointer"
                  onClick={handleDeleteEvent}
                  width="24"
                  height="24"
                >
                  <path
                    d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"
                    fill="rgba(51,187,207,1)"
                  ></path>
                </svg>
              </div>
            )}
          </>
        )}
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="bg-gray-800 w-auto my-6 mx-auto max-w-3xl p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Edit Event</h2>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              />
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
              />
              <DatePicker
                selected={formData.event_date}
                onChange={(date) => setFormData({...formData, event_date: date})}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={30}
                dateFormat="yyyy-MM-dd hh:mm aa"
                className="w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-white border-gray-600 focus:border-blue-300 focus:outline-none focus:ring"
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
              {loading ? (
                <Loader />
              ) : (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSaveEdit}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleCancelEdit}
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
      {user &&
        user.is_staff &&
        isEditingCoverImage && ( // Show cover image input when isEditingCoverImage is true
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-container">
              <div className="bg-gray-800 w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-white">Change Cover Photo</h2>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleCoverImageChange}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-md text-white"
                />
                {loading ? (
                  <Loader />
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={updateCoverImage}
                      disabled={loading}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setIsEditingCoverImage(false)}
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
    </div>
  );
};
