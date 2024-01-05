import React, { useState } from "react";
import { ResourceComponent } from "../components/ResourceComponent";
import { Link } from "react-router-dom";

export const Resource = () => {

  const resourceList = [
    { tag:"seniorresource",title: "Seniors Resources", description: "Links to resources shared by seniors" },
    { tag:"courseslide",title: "Courses Slides", description: "Slides for various courses" },
    { tag:"termfinal",title: "Term Final", description: "Questions from previous years' term finals and solutions" },
    { tag:"ctquestion",title: "CT questions", description: "Questions of previous years Class tests" },
    { tag:"classnote",title: "Class notes", description: "Class notes of our classmates and seniors" },
    { tag:"classrecording",title: "Class Recordings", description: "All currently available recordings of different courses" },
  ];


  return (
    <div>

      <div className="resource-container">
        {resourceList.map((resource, index) => (
          <Link className="resource-link" key={index} to={`/resource/${resource.tag}`}>
          <ResourceComponent title={resource.title} description={resource.description} />
        </Link>
        ))}
      </div>
    </div>
  );
};
