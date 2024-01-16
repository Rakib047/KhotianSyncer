import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuthContext } from "../../hooks/useAuthContext";

export const TermFinal = ({termFinalId,courseTitle, termFinalFileName, batch, termFinalUrl,fetchTermFinal }) => {
    const { user } = useAuthContext();

    const handleDelete = async ()=>{
        try {
            await axios.delete(`/api/termfinal/${termFinalId}`,{
              headers: {
                Authorization: `Bearer ${user.jwtToken}`,
              },
            })

            Swal.fire({
                icon: 'warning',
                title: 'New Term Resource!',
                text: `${courseTitle}:${termFinalFileName} deleted from Term Final Resource!`,
                confirmButtonColor: '#1aac83',
                background: '#f1f1f1',
              });

              fetchTermFinal()
        } catch (error) {
            console.log("error deleting term final resource",error)
        }

    }

  return (
    <div className="khotian-details">
      <h4>{courseTitle}</h4>
      <p><strong>File Name :</strong> {termFinalFileName}</p>
      <p><strong>Batch :</strong> {batch}</p>
      <a href={termFinalUrl} target="_blank" rel="noopener noreferrer" className='custom-link'>
        <strong><i class="fa-solid fa-cloud-arrow-down"></i> View File</strong>
      </a>
      <button onClick={handleDelete} className='delete-btn'><i class="fa-solid fa-trash-can"></i> Delete</button>
    </div>
  );
};

