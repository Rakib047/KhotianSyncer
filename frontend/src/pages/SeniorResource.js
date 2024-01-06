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
  const [resourceLinks,setResourceLinks] = useState([])

  useEffect(()=>{
    const fetchSeniorResourceLinks = async () =>{
      const response = await axios.get("/api/resource", {
        params: { tag: "senior resource" },
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      });
      
      if(response.status===200){
        //console.log(response)
        //setResourceLinks(response.data)
      }
    }

    if(user){
      fetchSeniorResourceLinks()
    }
  },[])

  const handleFormOpen = () => {
    setFormOpen(true);
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
      console.log(response.data)
      setResourceLinks([...resourceLinks,response.data])
    }
    // Reset form data and close the form
    setResourceData({ title: "", semester: "", link: "" });
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
        </form>
      )}
      {/* Render ResourceLink components based on your data */}
      {resourceLinks.map((link, index) => (
        <ResourceLink
          key={index}
          title={link.title}
          semester={link.semester}
          link={link.link}
        />
      ))}
    </div>
  );
};

export default SeniorResource;
