import React from "react";
import PropTypes from "prop-types";
import { leadershipIcon, linkedin } from "../assets";

function LeadershipCard({ name, title, img, url }) {
  return (
    <div className="flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card border-[1px]">
      <div className="flex items-center">
        <img src={leadershipIcon} alt="leadership" className="w-[42.6px] h-[27.6px] object-contain" />
        <a href={url} target="_blank" rel="noopener noreferrer" className="ml-2 cursor-pointer">
          <img
            src={linkedin}
            alt="linkedin"
            className="w-[24px] h-[24px] object-contain hover:text-blue-500 transition-colors duration-300"
          />
        </a>
      </div>

      <div className="flex flex-row mt-5">
        <img src={img} alt={name} className="w-[48px] h-[48px] rounded-full" />
        <div className="flex flex-col ml-4">
          <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">{name}</h4>
          <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">{title}</p>
        </div>
      </div>
    </div>
  );
}

LeadershipCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default LeadershipCard;
