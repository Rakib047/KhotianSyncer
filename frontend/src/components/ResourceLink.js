import React from 'react';
import axios from 'axios';
import {useAuthContext} from "../hooks/useAuthContext"

export const ResourceLink = ({_id,tag,updateLinks,title,semester,link}) => {

  const {user} = useAuthContext()

  const handleDelete = async()=>{
    try {

        const response = await axios.delete(`/api/resource/${tag}/${_id}`,
            {
              headers : {
                Authorization : `Bearer ${user.jwtToken}`
              }
            }
        )

        if(response.status===200){
          console.log("ye accha vai!")
          updateLinks()
        }
      
    } catch (err) {
      
    }
  }

  return (
    <div className="khotian-details">
      <h4>{title}</h4>
      <p>Semester: {semester}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

