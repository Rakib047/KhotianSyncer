import React from 'react'

export const ResourceLink = ({title,semester,link}) => {

  return (
    <div className="khotian-details">
      <h4>{title}</h4>
      <p>Semester: {semester}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    </div>
  )
}

