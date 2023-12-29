// YourMainComponent.js
import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import KhotianSummary from "../components/KhotianSummary";

export const Profile = () => {
  return (
    <div className="card-container">
      <ProfileDetails />
      <KhotianSummary />
    </div>
  );
};

