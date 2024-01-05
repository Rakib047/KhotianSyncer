import React, { useState } from 'react';
import {ResourceLink} from "../components/ResourceLink";

const SeniorResource = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [resourceData, setResourceData] = useState({ title: '', semester: '', link: '' });

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle submitting the form data (you can send it to the backend or update state as needed)
    console.log('Form submitted:', resourceData);
    // Reset form data and close the form
    setResourceData({ title: '', semester: '', link: '' });
    setFormOpen(false);
  };

  return (
    <div>
      <button onClick={handleFormOpen}>Add Resource Link</button>
      {isFormOpen && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Resource Title:
            <input
              type="text"
              value={resourceData.title}
              onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
            />
          </label>
          <label>
            Semester:
            <input
              type="text"
              value={resourceData.semester}
              onChange={(e) => setResourceData({ ...resourceData, semester: e.target.value })}
            />
          </label>
          <label>
            Link:
            <input
              type="text"
              value={resourceData.link}
              onChange={(e) => setResourceData({ ...resourceData, link: e.target.value })}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {/* Render ResourceLink components based on your data */}
      <ResourceLink title="Example Title" semester="Example Semester" link="https://example.com" />
    </div>
  );
};

export default SeniorResource;
