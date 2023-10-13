import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../style";

function EmailVerification() {
  const navigate = useNavigate();

  useEffect(() => {
    const delay = 100000;

    const redirectTimer = setTimeout(() => {
      navigate("/signin");
    }, delay);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className={`${styles.flexCenter} ${styles.marginY} ${styles.marginX}`}>
      <div
        className={`border ${styles.paddingX} ${styles.paddingY} rounded-lg bg-black-gradient-2 box-shadow`}
      >
        <h2 className="text-secondary m-5">Email Verification</h2>
        <p className="text-white">
          Thank you for signing up!
          <br />
          An email with a verification link has been sent to your email address.
          <br />
          Please click the link to verify your email.
        </p>
      </div>
    </div>
  );
}

export default EmailVerification;
