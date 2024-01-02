import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {arrowRight, upvoteIcon, commentIcon, shareIcon, activeupvoteIcon} from "../assets";
import {useAuth} from "../contexts/AuthContext";

export const BlogCard = ({
  title,
  is_project,
  created_at,
  cover_image,
  upvotes,
  comments,
  link,
  slug
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const {user} = useAuth();

  // Function to convert date to the desired format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) {
      return `${diffSeconds} s`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} min`;
    } else if (diffHours < 24) {
      return `${diffHours} hr`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffYears >= 1) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } else if (diffMonths >= 1 && diffMonths < 12) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    }
  };

  const formattedDate = formatDate(created_at);

  return (
    <div
      className="relative rounded-lg border shadow-md bg-gray-900 border-gray-700 hover:border-secondary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <a
          className="absolute top-2 right-2 inline-flex items-center py-2 px-4 text-sm font-poppins font-medium text-primary bg-blue-gradient rounded-[10px]
          outline-none capitalize transition-colors duration-300 transform hover:bg-green-400 active:bg-green-500 focus:outline-none
          focus:ring focus:ring-green-200 focus:ring-opacity-50 cursor-pointer"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          Read Post
          <img src={arrowRight} alt="arrow-right" className="w-[23px] h-[16px] object-contain" />
        </a>
      )}

      <Link to={`/blog-detail/${slug}`}>
        {/* w-full */}
        <div className="rounded-lg h-48 w-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={cover_image}
            alt="blog_image"
            loading="lazy"
          />
        </div>

        <div className="p-3">
          <div className="text-xs font-bold text-teal-700 mt-1 flex justify-between">
            <p>{is_project ? "Project" : null}</p>
            <p>{formattedDate}</p>
          </div>
          {/* Topic / Title */}
          <h5 className="text-l font-bold tracking-tight text-white">{title}</h5>
        </div>

        <div className="flex justify-between m-2 mt-0 text-gray-400">
          <div className="flex">
            {user ? (
              upvotes.some((upvote) => upvote.upvoted_by === user.pk) ? (
                <img
                  src={activeupvoteIcon}
                  alt="upvoted"
                  className="w-[24px] h-[24px] object-contain"
                />
              ) : (
                <img src={upvoteIcon} alt="upvote" className="w-[24px] h-[24px] object-contain" />
              )
            ) : (
              <img src={upvoteIcon} alt="upvote" className="w-[24px] h-[24px] object-contain" />
            )}
            <span className="ml-2">{upvotes.length}</span>
          </div>

          <div className="flex justify-between m-2 mt-0 text-gray-400">
            <img src={commentIcon} alt="comment" className="w-[24px] h-[24px] object-contain" />
            <span className="ml-2">{comments.length}</span>
          </div>
          <div className="text-gray-400 hover:text-green-300">
            <img src={shareIcon} alt="share" className="w-[24px] h-[24px object-contain" />
          </div>
        </div>
      </Link>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  is_project: PropTypes.bool.isRequired,
  created_at: PropTypes.string.isRequired,
  cover_image: PropTypes.string.isRequired,
  upvotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.number).isRequired,
  link: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};
