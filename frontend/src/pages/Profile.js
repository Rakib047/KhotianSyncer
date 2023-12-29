// YourMainComponent.js
import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import ProfileCustomize from "../components/ProfileCustomize";

export const Profile = () => {
  return (
    <div className="card-container">
      <ProfileDetails />
      <ProfileCustomize />
    </div>
  );
};

