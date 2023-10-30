import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

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

export const EventCard = ({title, eventDate, location, host, coverImage, slug}) => {
  const formattedDate = formatDate(eventDate);

  return (
    <div className="rounded-lg border shadow-md bg-gray-900 border-gray-700 hover:border-secondary">
      <Link to={`/event-detail/${slug}`}>
        <div className="aspect-w-16 aspect-h-9 p-3">
          <img className="rounded-lg" src={coverImage} alt="eventimage" />
        </div>
      </Link>
      <div className="p-3">
        <div className="text-xs font-bold uppercase text-teal-700 mt-1 mb-2">KUASA</div>
        <Link to={`/event-detail/${slug}`}>
          {/* Topic / Title */}
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white">{title}</h5>
        </Link>

        <p className="flex items-start -mx-2 mb-3">
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

          <span className="mx-2 text-white truncate w-72">{location}</span>
        </p>

        <p className="flex items-start -mx-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 text-white"
          >
            <path
              d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM11 13V17H6V13H11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"
              fill="rgba(51,187,207,1)"
            ></path>
          </svg>

          <span className="mx-2 text-white truncate w-75">
            {/* Wednesday, September 09, 2023 &bull; 04:00 PM */}
            {formattedDate}
          </span>
        </p>

        <p className="flex items-start -mx-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 text-white"
          >
            <path
              d="M17.0007 1.20801 18.3195 3.68083 20.7923 4.99968 18.3195 6.31852 17.0007 8.79134 15.6818 6.31852 13.209 4.99968 15.6818 3.68083 17.0007 1.20801ZM10.6673 9.33301 15.6673 11.9997 10.6673 14.6663 8.00065 19.6663 5.33398 14.6663.333984 11.9997 5.33398 9.33301 8.00065 4.33301 10.6673 9.33301ZM11.4173 11.9997 9.18905 10.8113 8.00065 8.58301 6.81224 10.8113 4.58398 11.9997 6.81224 13.1881 8.00065 15.4163 9.18905 13.1881 11.4173 11.9997ZM19.6673 16.333 18.0007 13.208 16.334 16.333 13.209 17.9997 16.334 19.6663 18.0007 22.7913 19.6673 19.6663 22.7923 17.9997 19.6673 16.333Z"
              fill="rgba(51,187,207,1)"
            ></path>
          </svg>

          <span className="mx-2 text-white truncate w-72 mb-2">
            By <span className="font-bold">{host}</span>
          </span>
        </p>

        <Link
          to={`/event-detail/${slug}`}
          className="inline-flex items-center py-2 px-4 font-poppins font-medium text-primary bg-blue-gradient rounded-[10px] outline-none capitalize transition-colors duration-300 transform hover:bg-green-400 active:bg-green-500 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50"
        >
          View Details
          <svg
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};
