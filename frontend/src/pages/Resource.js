import React, { useState } from "react";
import { ResourceComponent } from "../components/ResourceComponent";

export const Resource = () => {
  const [showForm, setShowForm] = useState(false);
  const [newResource, setNewResource] = useState("");
  const [resourceList, setResourceList] = useState([
    "Seniors Drive links",
    "Courses Slides",
    "Previous year questions",
    "CT questions",
    "Seniors Drive links",
    "Courses Slides",
    // Add more resources as needed
  ]);

  const handleAddResource = () => {
    if (newResource.trim() !== "") {
      setResourceList((prevResources) => [...prevResources, newResource]);
      setNewResource("");
      setShowForm(false);
    }
  };

  return (
    <div>
      <button className="plus-button" onClick={() => setShowForm(!showForm)}>{!showForm? "+":"-"}</button>

      {showForm && (
        <div className="addResource-form">
          <input
            type="text"
            value={newResource}
            onChange={(e) => setNewResource(e.target.value)}
            placeholder="Enter new resource"
            className="add-input"
          />
          <button className="addResource-button" onClick={handleAddResource}>Add</button>
        </div>
      )}

      <div className="resource-container">
        {resourceList.map((resource, index) => (
          <ResourceComponent key={index} title={resource} />
        ))}
      </div>
    </div>
  );
};
