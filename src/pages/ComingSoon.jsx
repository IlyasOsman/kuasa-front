import React from "react";
import styles from "../style";

export const ComingSoon = () => {
  return (
    <section
      className={`flex flex-col items-center justify-center ${styles.boxWidth} ${styles.marginY}`}
    >
      <h1 className="text-5xl text-secondary font-bold mb-8 animate-pulse">Coming Soon</h1>
      <p className="text-secondary text-lg mb-8 flex-wrap">
        We are working hard to bring you something amazing. Stay tuned!
      </p>
    </section>
  );
};
