import React from "react";
import styles from "../style";

const Loader = () => {
  return (
    <div className={`${styles.flexCenter} ${styles.marginY} ${styles.paddingY}`}>
      <span className="loading text-secondary loading-infinity loading-lg"></span>
    </div>
  );
};

export default Loader;
