import React, { useEffect, useState } from "react";
import { ResourceLink } from "../components/ResourceLink";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const SeniorResource = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [resourceData, setResourceData] = useState({
    title: "",
    semester: "",
    link: "",
  });
  const { user } = useAuthContext();
  const [resourceLinks, setResourceLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSeniorResourceLinks = async () => {
    const response = await axios.get("/api/resource", {
      params: { tag: "senior resource" },
      headers: {
        Authorization: `Bearer ${user.jwtToken}`,
      },
    });

    if (response.status === 200) {
      setResourceLinks(response.data.flat());
    }
  };

  useEffect(() => {
    if (user) {
      fetchSeniorResourceLinks();
    }
  }, []);

  const updateLinks = () => {
    fetchSeniorResourceLinks();
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleCancel = () => {
    // Reset form data and close the form
    setResourceData({ title: "", semester: "", link: "" });
    setFormOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle submitting the form data
    const { title, semester, link } = resourceData;
    const response = await axios.post(
      "/api/resource",
      { tag: "senior resource", title, semester, link },
      {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data);
      setResourceLinks([...resourceLinks, response.data]);
    }
    // Reset form data and close the form
    setResourceData({ title: "", semester: "", link: "" });
    setFormOpen(false);
  };

  const filteredLinks = resourceLinks.filter(
    (link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.semester.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <h2 className="headings"><i class="fa-solid fa-link"></i> Seniors Resources</h2>
        <button className="add-resource-link-button" onClick={handleFormOpen}>
          <i class="fa-solid fa-plus"></i> Add Resource
        </button>

    
          <input
            className="searchbar"
            type="search"
            placeholder="Search by Title or Semester..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        

      </div>

      <div className="form-container-wrapper">
        {isFormOpen && (
          <form className="form-container" onSubmit={handleFormSubmit}>
            <label>
              Resource Title:
              <input
                type="text"
                value={resourceData.title}
                onChange={(e) =>
                  setResourceData({ ...resourceData, title: e.target.value })
                }
              />
            </label>
            <label>
              Semester:
              <input
                type="text"
                value={resourceData.semester}
                onChange={(e) =>
                  setResourceData({ ...resourceData, semester: e.target.value })
                }
              />
            </label>
            <label>
              Link:
              <input
                type="text"
                value={resourceData.link}
                onChange={(e) =>
                  setResourceData({ ...resourceData, link: e.target.value })
                }
              />
            </label>
            <button type="submit">Submit</button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Render ResourceLink components based on your data */}
      {filteredLinks.map((link, index) => (
        <ResourceLink
          key={index}
          title={link.title}
          semester={link.semester}
          link={link.link}
          tag="senior resource"
          _id={link._id}
          updateLinks={updateLinks}
        />
      ))}
    </div>
  );
};

export default SeniorResource;
