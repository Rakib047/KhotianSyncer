// ProfileCard.js
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ProfileDetails = () => {
  const { user } = useAuthContext();

  // Dummy data (replace this with actual data from your user object)
  const studentId = "12345";
  const currentSemester = "Spring 2023";
  const department = "Computer Science";

  return (
    <div className="profile-card">
      <h1 className="logo-khotian">
        <span>Profile Info</span>
      </h1>
      <h2 className="username-container">
        <span>{user.username}</span>
      </h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Student ID:</strong> {studentId}
      </p>
      <p>
        <strong>Current Semester:</strong> {currentSemester}
      </p>
      <p>
        <strong>Department:</strong> {department}
      </p>
    </div>
  );
};

export default ProfileDetails;
