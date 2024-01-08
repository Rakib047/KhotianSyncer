import React from 'react';
import axios from 'axios';

export const Slide = ({slideId,courseTitle, slideName, semester, slideUrl,fetchSlides }) => {

    const handleDelete = async ()=>{
        try {
            await axios.delete(`/api/slide/${slideId}`)
            fetchSlides()
        } catch (error) {
            console.log("error deleting slide",error)
        }

    }

  return (
    <div className="khotian-details">
      <h4>{courseTitle}</h4>
      <p><strong>Slide Name :</strong> {slideName}</p>
      <p><strong>Semester :</strong> {semester}</p>
      <a href={slideUrl} target="_blank" rel="noopener noreferrer" className='custom-link'>
        <strong>View Slide</strong>
      </a>
      <button onClick={handleDelete} className='delete-btn'>Delete</button>
    </div>
  );
};

