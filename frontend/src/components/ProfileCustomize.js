import React, { useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext"
import axios from "axios";
const ProfileCustomize = () => {
  
  const {user} = useAuthContext()
  const [username,setNewUsername] = useState(user.username)
  const [currentSemester,setNewCurrentSemester] = useState(user.currentSemester)
  const [roll,setNewStudentId] = useState(user.roll)
  const [department,setNewDepartment] = useState(user.department)
  const [email,setNewEmail]=useState(user.email)

  const prevEmail=user.email

  const handleSubmit = async (e) => {
      e.preventDefault();

      const updatedUser={prevEmail,username,roll,currentSemester,department,email}
      console.log(updatedUser)
      
      try {
        
        const response = await axios.put('/api/user/profile',updatedUser);

        console.log(response.data)
        
      } catch (error) {
          console.log(error)
      }
  };

  return (
    <div className="upcoming-assessments-card">
      <h1 >
        <span className="logo-khotian" >Edit Profile</span>
      </h1>
      <form>
          
          <input
            type="text"
            onChange={(e)=>setNewUsername(e.target.value)}
            
            placeholder="Change username (optional)"
          />
        
          <input
            type="text"
            onChange={(e)=>setNewCurrentSemester(e.target.value)}
           
            placeholder="Update current Semester (optional)"
          />
        
        
          <input
            type="text"
            onChange={(e)=>setNewStudentId(e.target.value)}
            
            placeholder="Change Student Id (optional)"
          />
        
        
          <input
            type="text"
            onChange={(e)=>setNewDepartment(e.target.value)}
            
            placeholder="Update Department name (optional)"
          />
        
      
          <input
            type="email"

            onChange={(e)=>setNewEmail(e.target.value)}
            
            placeholder="Change your Email  (optional)"
          />
        
        <button type="submit" onClick={handleSubmit}>
          Update Profile
        </button>
      
      </form>
    </div>
  );
};

export default ProfileCustomize;
