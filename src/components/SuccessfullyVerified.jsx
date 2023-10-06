import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import styles from "../style";

const kuasaApi = import.meta.env.VITE_REACT_APP_KUASA_API;

function SuccessfullyVerified() {
  const {token} = useParams();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  // console.log(token);

  useEffect(() => {
    // Send a POST request to your backend to verify the email with the provided token
    fetch(`${kuasaApi}/api/verify-email/?token=${token}`)
      .then((response) => {
        // console.log(response.json);
        if (response.ok) {
          setVerificationStatus("Email Successfully Verified");
        } else {
          // console.log(response.status); // Log the HTTP status code for debugging
          setVerificationStatus("Email Verification Failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setVerificationStatus("Email Verification Failed");
      });
  }, [token]);

  return (
    <div className={`${styles.flexCenter} ${styles.marginY} ${styles.marginX}`}>
      <div
        className={`border ${styles.paddingX} ${styles.paddingY} rounded-lg bg-black-gradient-2 box-shadow`}
      >
        <div className="flex justify-center">
          {verificationStatus === "Email Successfully Verified" ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
              <path
                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"
                fill="rgba(14,238,89,1)"
              ></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
              <path
                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"
                fill="rgba(253,17,17,1)"
              ></path>
            </svg>
          )}
        </div>
        <h2 className="text-secondary m-5">Email Verification</h2>

        <p className="text-sm text-red-500">{verificationStatus}</p>
        {verificationStatus === "Email Successfully Verified" && (
          <div>
            <p>
              Your email has been successfully verified.
              <br />
              You can now log in to your account.
            </p>
            <Link to="/signin">Log In</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuccessfullyVerified;
