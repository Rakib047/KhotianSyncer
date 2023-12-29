import React, { useState } from "react";

const ProfileCustomize = ({ user, onUpdateProfile }) => {
  // const [formData, setFormData] = useState({
  //   username: user.username,
  //   currentSemester: user.currentSemester,
  //   studentId: user.studentId,
  //   department: user.department,
  //   email: user.email,
  // });

  const handleChange = (e) => {
    //const { name, value } = e.target;
    //setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    // Pass the updated profile information to the parent component
    //onUpdateProfile(formData);
  };

  return (
    <div className="upcoming-assessments-card">
      <h1 >
        <span className="logo-khotian" >Edit Profile</span>
      </h1>
      <form>
        
          <label >Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            //value={formData.username}
            //onChange={handleChange}
          />
        
      
          <label htmlFor="currentSemester">Current Semester:</label>
          <input
            type="text"
            id="currentSemester"
            name="currentSemester"
            //value={formData.currentSemester}
            //onChange={handleChange}
          />
        
        
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            //value={formData.studentId}
            //onChange={handleChange}
          />
        
        
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            //value={formData.department}
            //onChange={handleChange}
          />
        
      
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            //value={formData.email}
            //onChange={handleChange}
          />
        
        <button type="button" onClick={handleSubmit}>
          Update Profile
        </button>
      
      </form>
    </div>
  );
};

export default ProfileCustomize;
