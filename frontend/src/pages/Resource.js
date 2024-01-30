import React, { useState, useEffect } from "react";
import { ResourceComponent } from "../components/ResourceComponent";
import { Link } from "react-router-dom";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export const Resource = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const resourceList = [
    { tag: "seniorresource", title: "Seniors Resources", description: "Links to resources shared by seniors" },
    { tag: "courseslide", title: "Courses Slides", description: "Slides for various courses" },
    { tag: "termfinal", title: "Term Final", description: "Questions from previous years' term finals and solutions" },
    { tag: "ctquestion", title: "CT questions", description: "Questions of previous years Class tests" },
    { tag: "classnote", title: "Class notes", description: "Class notes of our classmates and seniors" },
    { tag: "classrecording", title: "Class Recordings", description: "All currently available recordings of different courses" },
    { tag: "book", title: "Books", description: "All academic books" },
  ];

  return (
    <div>
      <h2 className="headings">
        <i className="fa-regular fa-folder-open"></i> Resources
      </h2>
      {isLoading ? (
        <div className="loader-container">
          <ClimbingBoxLoader color="#1aac83" />
        </div>
      ) : (
        <div className="resource-container">
          {resourceList.map((resource, index) => (
            <Link className="resource-link" key={index} to={`/resource/${resource.tag}`}>
              <ResourceComponent title={resource.title} description={resource.description} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
