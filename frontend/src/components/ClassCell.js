// ClassCell.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const ClassCell = ({ rowIndex, colIndex, searchQuery }) => {
  const [cellId, setCellId] = useState();
  const [courseName, setCourseName] = useState();
  const [courseTeacher, setCourseTeacher] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [link, setLink] = useState();
  const [isEditing, setEditing] = useState(false);
  const { user } = useAuthContext();

  const handleEditClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    // Fetch initial data when component mounts
    axios
      .get(`/api/routine/${rowIndex}/${colIndex}`, {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((response) => {
        const { courseName, courseTeacher, roomNumber, onlineLink } =
          response.data;
        setCourseName(courseName);
        setCourseTeacher(courseTeacher);
        setRoomNumber(roomNumber);
        setLink(onlineLink);
        setCellId(response.data._id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Run the effect when cellId changes

  const handleSaveClick = () => {
    // Determine whether it's an update or a create operation
    const axiosMethod = cellId ? axios.put : axios.post;

    // Send data to the backend
    axiosMethod(
      `/api/routine${cellId ? `/${cellId}` : ""}`,
      {
        courseName,
        courseTeacher,
        roomNumber,
        onlineLink: link,
        rowIndex,
        colIndex,
      },
      {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      }
    )
      .then((response) => {
        setCellId(response.data._id);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div className="class-cell-container">
      {isEditing ? (
        <>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter Course/CT..."
          />
          <br />
          <input
            type="text"
            value={courseTeacher}
            onChange={(e) => setCourseTeacher(e.target.value)}
            placeholder="Enter Course Teachers..."
          />
          <br />
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="Enter Room Number..."
          />
          <br />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter Zoom Link if any..."
          />
          <br />
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
          <button className="cancel-button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <strong>
            <div
              className={
                searchQuery &&
                courseName &&
                courseName.toLowerCase().includes(searchQuery.toLowerCase())
                  ? "highlighted"
                  : ""
              }
            >
              {courseName ? courseName : "-"}
            </div>
          </strong>

          <br />
          {courseTeacher && <span>{courseTeacher}</span>}
          <br />
          {roomNumber && <span>{roomNumber}</span>}
          <br />

          {link && (
            <>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="custom-link"
              >
                Zoom Link
              </a>{" "}
            </>
          )}

          <button className="edit-button" onClick={handleEditClick}>
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default ClassCell;
