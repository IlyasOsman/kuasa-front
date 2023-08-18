import React from "react";
import PropTypes from "prop-types";
import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card border-[0.1px]`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">{title}</h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">{content}</p>
    </div>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const HomePageSectionOne = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Focus on passion, <br className="sm:block hidden" /> KUASA handle the rest.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        With KUASA at your side, you can elevate your aerospace journey by immersing yourself in a world of hands-on
        projects, cultivating invaluable skills, and building a network of like-minded individuals.
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default HomePageSectionOne;
