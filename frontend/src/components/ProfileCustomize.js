import React, { useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext"
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const ProfileCustomize = () => {
  
  const {user,dispatch} = useAuthContext()
  var [username,setNewUsername] = useState("")
  var [currentSemester,setNewCurrentSemester] = useState("")
  var [roll,setNewStudentId] = useState("")
  var [department,setNewDepartment] = useState("")
  var [email,setNewEmail]=useState("")

  const prevEmail=user.email

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(username==="") username=user.username
      if(currentSemester==="") currentSemester=user.currentSemester
      if(roll==="") roll=user.roll
      if(department==="") department=user.department
      if(email==="") email=user.email

      const updatedUser={prevEmail,username,roll,currentSemester,department,email}
      
      
      try {
        
        const response = await axios.put('https://khotiansyncer-backend.onrender.com/api/user/profile',updatedUser);

        console.log(response.data)

        dispatch({type:"LOGIN",payload:response.data})

        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: "",
          confirmButtonColor: '#1aac83',
          background: '#f1f1f1',
        });
        
        setNewDepartment("")
        setNewEmail("")
        setNewStudentId("")
        setNewUsername("")
        setNewCurrentSemester("")
        
      } catch (error) {
          console.log(error)
      }
  };


  

  return (
    <div className="profile-customize-card">
      <h1 className="logo-khotian">
        <span>Edit Profile</span>
      </h1>
      <form onSubmit={handleSubmit} id="update-profile-form">
          
          <input
            type="text"
            onChange={(e)=>setNewUsername(e.target.value)}
            value={username}
            placeholder="Change username (optional)"
          />
        
          <input
            type="text"
            onChange={(e)=>setNewCurrentSemester(e.target.value)}
            value={currentSemester}
            placeholder="Update current Semester (optional)"
          />
        
        
          <input
            type="text"
            onChange={(e)=>setNewStudentId(e.target.value)}
            value={roll}
            placeholder="Change Student Id (optional)"
          />
        
        
          <input
            type="text"
            onChange={(e)=>setNewDepartment(e.target.value)}
            value={department}
            placeholder="Update Department name (optional)"
          />
        
      
          <input
            type="email"

            onChange={(e)=>setNewEmail(e.target.value)}
            value={email}
            placeholder="Change your Email  (optional)"
          />
        
        <button>
          Update Profile
        </button>
      
      </form>
    </div>
  );
};

export default ProfileCustomize;
