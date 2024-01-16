import React, { useState, useEffect } from 'react';
import {TermFinal} from '../components/ResourceFile/TermFinal'; // Import the Slide component
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuthContext } from "../hooks/useAuthContext";

export const TermFinalResource = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    batch: '',
    file: null,
  });
  const [termFinal, setTermFinal] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch termFinal from the server when the component mounts
    fetchTermFinal();
  }, []);

  const fetchTermFinal = async () => {
    try {
      const response = await axios.get('/api/termfinal',{
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      });
      setTermFinal(response.data.allTermFinal);
    } catch (error) {
      console.error('Error fetching termFinal:', error);
    }
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    // Reset form data when the form is closed
    setCourseData({
      title: '',
      batch: '',
      file: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseData({ ...courseData, file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Implement file upload logic here (e.g., send a request to your server)
    console.log('Form submitted with data:', courseData);
    try {
      const formData = new FormData();
      formData.append('courseTitle', courseData.title);
      formData.append('batch', courseData.batch);
      formData.append('termfinal', courseData.file);
      await axios.post('/api/termfinal', formData,{
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'New Term Resource!',
        text: `${courseData.title}:${courseData.file.name} added to termFinal!`,
        confirmButtonColor: '#1aac83',
        background: '#f1f1f1',
      });

      // Refresh termFinal after successful submission
      fetchTermFinal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    // Reset form data after successful submission
    handleFormClose();
  };

  const [searchQuery, setSearchQuery] = useState('');
  const filteredtermFinal = termFinal.filter(
    (tf) =>
      tf.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tf.batch.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div>
        <h2 className="headings"><i class="fa-regular fa-newspaper"></i> Term Final Questions and Solutions</h2>

        <div>
        <button className='add-resource-link-button' onClick={handleFormOpen}>Add Term Resource</button>
        <input
          className="searchbar"
          type="text"
          placeholder="Search by Title or batch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      
      <div>
      {isFormOpen && (
        <div className="form-container-wrapper">
          <form className="form-container" onSubmit={handleFormSubmit}>
            <label>
              Course Title:
              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Batch:
              <input
                type="text"
                name="batch"
                value={courseData.batch}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Upload File:
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept=".pdf, .pptx"
                required
              />
            </label>
            <button type="submit">Submit</button>
            <button className="cancel-button" onClick={handleFormClose}>Cancel</button>
          </form>
        </div>
      )}
      </div>
      {/* Display termFinal */}
      {filteredtermFinal.map((tf) => (
        <TermFinal
          key={tf._id}
          termFinalId={tf._id}
          courseTitle={tf.courseTitle}
          batch={tf.batch}
          termFinalFileName={tf.termFinalFileName}
          termFinalUrl={tf.termFinalUrl}
          fetchTermFinal={fetchTermFinal}
        />
      ))}
    </div>
  );
};

