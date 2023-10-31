import React from "react";
import PropTypes from "prop-types";
import {leadershipIcon, linkedinIcon, placeholderprofileimage} from "../assets";

function LeadershipCard({first_name, last_name, leadership_role, profile_image, linkedin}) {
  return (
    <div className="flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card border-[1px]">
      <div className="flex items-center">
        <img
          src={leadershipIcon}
          alt="leadership"
          className="w-[42.6px] h-[27.6px] object-contain"
        />
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 cursor-pointer"
          >
            <img
              src={linkedinIcon}
              alt="linkedin"
              className="w-[24px] h-[24px] object-contain hover:text-blue-500 transition-colors duration-300"
            />
          </a>
        )}
      </div>

      <div className="flex flex-row mt-5">
        {profile_image !== null ? (
          <img src={profile_image} alt={first_name} className="w-[48px] h-[48px] rounded-full" />
        ) : (
          <img
            className="w-[48px] h-[48px] border-2 border-secondary rounded-full"
            src={placeholderprofileimage}
            alt=""
          />
        )}
        <div className="flex flex-col ml-4">
          <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
            {first_name} {last_name}
          </h4>
          <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
            {leadership_role}
          </p>
        </div>
      </div>
    </div>
  );
}

LeadershipCard.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  leadership_role: PropTypes.string.isRequired,
  profile_image: PropTypes.string,
  linkedin: PropTypes.string
};

export default LeadershipCard;
