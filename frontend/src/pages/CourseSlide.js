import React, { useState, useEffect } from 'react';
import {Slide} from '../components/Slide'; // Import the Slide component
import axios from 'axios';

export const CourseSlide = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    semester: '',
    file: null,
  });
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Fetch slides from the server when the component mounts
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get('/api/slide');
      setSlides(response.data.allSlides);
    } catch (error) {
      console.error('Error fetching slides:', error);
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
      semester: '',
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
      formData.append('semester', courseData.semester);
      formData.append('slide', courseData.file);
      await axios.post('/api/slide', formData);
      // Refresh slides after successful submission
      fetchSlides();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    // Reset form data after successful submission
    handleFormClose();
  };

  return (
    <div>
        <h2 className="headings"><i class="fa-regular fa-file-powerpoint"></i> Courses Slides</h2>
      <button className='add-resource-link-button' onClick={handleFormOpen}>Add PDF/Slide</button>
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
              Semester:
              <input
                type="text"
                name="semester"
                value={courseData.semester}
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
      {/* Display slides */}
      {slides.map((slide) => (
        <Slide
          key={slide._id}
          courseTitle={slide.courseTitle}
          semester={slide.semester}
          slideName={slide.slideName}
          slideUrl={slide.slideUrl}
        />
      ))}
    </div>
  );
};

export default CourseSlide;
