import React from 'react'

const KhotianDetails = ({singleKhotian}) => {

  // Format date to YYYY-MM-DD or use the existing format
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      return dateString; // If the date is invalid, return the original string
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return dateObject.toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="workout-details">
      <h4>{singleKhotian.taskTitle}</h4>
      <p><strong>Task Details :</strong> {singleKhotian.taskDetail}</p>
      <p><strong>Date :</strong> {formatDate(singleKhotian.date)}</p>
      <p><strong>Task added at :</strong>{formatDate(singleKhotian.createdAt)}</p>
    </div>
  )
}

export default KhotianDetails
