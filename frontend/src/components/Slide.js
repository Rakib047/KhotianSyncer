import React from 'react';

export const Slide = ({ courseTitle, slideName, semester, slideUrl }) => {
  return (
    <div className="khotian-details">
      <h3>{courseTitle}</h3>
      <p>Slide Name: {slideName}</p>
      <p>Semester: {semester}</p>
      <a href={slideUrl} target="_blank" rel="noopener noreferrer">
        View Slide
      </a>
    </div>
  );
};

