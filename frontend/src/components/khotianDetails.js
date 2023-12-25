import axios from 'axios';
import React from 'react'
import {useKhotianContext} from "../hooks/useKhotianContext"
const KhotianDetails = ({singleKhotian}) => {
  const {dispatch} =useKhotianContext()
  const handleClick = async () =>{
      axios.delete("/api/khotian/"+singleKhotian._id)
            .then(response=>dispatch({type:"DELETE_KHOTIAN",payload:response.data}))
            .catch(err=>{console.log(err)})
  }

  // Format date to DD-MM-YYYY or use the existing format
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      return dateString; // If the date is invalid, return the original string
    }
  
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  };

  return (
    <div className="workout-details">
      <h4>{singleKhotian.taskTitle}</h4>
      <p><strong>Task Details :</strong> {singleKhotian.taskDetail}</p>
      <p><strong>Date :</strong> {formatDate(singleKhotian.date)}</p>
      <p><strong>Task added at :</strong>{formatDate(singleKhotian.createdAt)}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default KhotianDetails
