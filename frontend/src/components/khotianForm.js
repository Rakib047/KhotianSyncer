import React, { useState } from 'react'
import axios from "axios"
import {useKhotianContext} from "../hooks/useKhotianContext"
const KhotianForm = () => {
    const[taskTitle,setTaskTitle]=useState("")
    const[taskDetail,setTaskDetail]=useState("")
    const[date,setDate]=useState("")
    const[priority,setPriority]=useState("High")
    const[error,setError]=useState("")
    const[success,setSuccess]=useState("")

    const {dispatch}=useKhotianContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const singleKhotian = { taskTitle, taskDetail, date,priority };
        
        try {
          const response = await axios.post("/api/khotian", singleKhotian, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          dispatch({type:"SET_KHOTIANS",payload:response.data})
          // Assuming the response structure is the same as with fetch
       
            setTaskTitle("");
            setTaskDetail("");
            setDate("");
            setPriority("High")
            setError(null);
            setSuccess("Task added!")
            //console.log("new workout added!", json);
        
        } catch (error) {
          // Handle any errors that occurred during the fetch
          setError("Please fill up all the fields");
          setSuccess(null)
          console.error("Error during fetch:", error);
        }
      };


  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new task</h3>

        <label>Task's Title:</label>
        <input
            type="text"
            onChange={(e)=>{setTaskTitle(e.target.value)}}
            value={taskTitle} // jodi title er value baire theke change hoy  
            placeholder="Enter task's title" 
        />

        <label>Task's Details:</label>
        <input
            type="text"
            onChange={(e)=>{setTaskDetail(e.target.value)}}
            value={taskDetail} 
            placeholder="Enter task's details"
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
          defaultValue="Low"  
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button>Add to khotian</button>
        {success && <div className='success'>{success}</div>}
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default KhotianForm
