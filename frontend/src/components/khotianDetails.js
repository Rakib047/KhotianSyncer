import React from 'react'

const KhotianDetails = ({singleKhotian}) => {
  return (
    <div className="workout-details">
      <h4>{singleKhotian.taskTitle}</h4>
      <p><strong>Task Details :</strong> {singleKhotian.taskDetail}</p>
      <p><strong>Date :</strong> {singleKhotian.date}</p>
      <p>{singleKhotian.createdAt}</p>
    </div>
  )
}

export default KhotianDetails
