import React from "react";

export const ResourceComponent = ({ title,description }) => {
  return (
    <div>
      <div className="resource-card">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

