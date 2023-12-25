import React from 'react'

const KhotianDetails = ({singleKhotian}) => {

    // Format date to YYYY-MM-DD
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-US', options);
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
