// YourMainComponent.js
import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import ProfileCustomize from "../components/ProfileCustomize";

export const Profile = () => {
  return (
    <div>
      <h2 className="headings"><i class="fa-solid fa-address-card"></i> My Profile</h2>
    <div className="card-container">
      
      <ProfileDetails />
      <ProfileCustomize />
    </div>
    </div>
  );
};

