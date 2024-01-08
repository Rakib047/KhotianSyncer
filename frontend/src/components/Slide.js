import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const Slide = ({slideId,courseTitle, slideName, semester, slideUrl,fetchSlides }) => {

    const handleDelete = async ()=>{
        try {
            await axios.delete(`/api/slide/${slideId}`)

            Swal.fire({
                icon: 'warning',
                title: 'New Slide!',
                text: `${courseTitle}:${slideName} deleted from Slides!`,
                confirmButtonColor: '#1aac83',
                background: '#f1f1f1',
              });

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

