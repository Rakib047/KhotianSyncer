import React, { useState,useEffect } from 'react'
import axios from "axios"
import {useKhotianContext} from "../hooks/useKhotianContext"
import {useAuthContext} from "../hooks/useAuthContext"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const KhotianForm = () => {
    const[taskTitle,setTaskTitle]=useState("")
    const[taskDetail,setTaskDetail]=useState("")
    const[date,setDate]=useState("")
    const[priority,setPriority]=useState("Low")
    const[taskType,setTaskType]=useState("CT")
    const[error,setError]=useState("")
    const[success,setSuccess]=useState("")
    const {dispatch}=useKhotianContext()
    const {user}=useAuthContext()




    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
          setError("You must be logged in")
          return
        }

        const singleKhotian = { taskTitle,taskType, taskDetail, date,priority };
        
        try {
          const response = await axios.post("/api/khotian", singleKhotian, {
            headers: {
              "Content-Type": "application/json",
              'Authorization' : `Bearer ${user.jwtToken}`
            },
          });
          
          dispatch({type:"SET_KHOTIANS",payload:response.data})
          // Assuming the response structure is the same as with fetch
       
            setTaskTitle("");
            setTaskDetail("");
            setTaskType("CT");
            setDate("");
            setPriority("Low")
            setError(null);
            setSuccess("Task added!")

                        // Show success message using SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'New Assesment!',
              text: `${singleKhotian.taskTitle}:${singleKhotian.taskType} added to Khotian!`,
              confirmButtonColor: '#1aac83',
              background: '#f1f1f1',
            });
        
        } catch (error) {
          // Handle any errors that occurred during the fetch
          setError("Please fill up all the fields");
          setSuccess(null)
          console.error("Error during fetch:", error);

          // Show error message using SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please fill up all the fields',
            confirmButtonColor: '#e7195a',
            background: '#f1f1f1',
          });
        }
      };





  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Assessment</h3>

        <label>Course Title:</label>
        <input
            type="text"
            onChange={(e)=>{setTaskTitle(e.target.value)}}
            value={taskTitle} // jodi title er value baire theke change hoy  
            placeholder="e.g.,CSE 405" 
        />

        <label>Assessment Type:</label>
        <select
          onChange={(e) => setTaskType(e.target.value)}
          value={taskType}
            
        >
          <option value="CT">CT</option>
          <option value="OFFLINE">OFFLINE</option>
          <option value="ONLINE">ONLINE</option>
          <option value="ASSIGNMENT">ASSIGNMENT</option>
          <option value="EVALUATION">EVALUATION</option>
          <option value="THESIS">THESIS WORK</option>
          <option value="PRESENTATION">PRESENTATION</option>
          <option value="LAB QUIZ">LAB QUIZ</option>
        </select>

        <label>Assessment Details:</label>
        <input
            type="text"
            onChange={(e)=>{setTaskDetail(e.target.value)}}
            value={taskDetail} 
            placeholder="Enter assesment details"
        />

        <label>Date:</label>
        <input
            type="date"
            onChange={(e)=>{setDate(e.target.value)}}
            value={date} 
            placeholder="Select a date"
        />

        <label>Priority:</label>
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
            
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button>Add to khotian</button>
        {/* {success && <div className='success'>{success}</div>}
        {error && <div className='error'>{error}</div>} */}
    </form>
  )
}

export default KhotianForm
