import React, { useState, useEffect } from "react";
import ProfileDetails from "../components/ProfileDetails";
import ProfileCustomize from "../components/ProfileCustomize";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [setIsLoading]);

  return (
    <div>
      <h2 className="headings">
        <i className="fa-solid fa-address-card"></i> My Profile
      </h2>
      {isLoading ? (
        <div className="loader-container">
          <ClimbingBoxLoader color="#1aac83" />
        </div>
      ) : (
        <div className="card-container">
          <ProfileDetails />
          <ProfileCustomize />
        </div>
      )}
    </div>
  );
};
