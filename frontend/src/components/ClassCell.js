// ClassCell.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import PropagateLoader from "react-spinners/PropagateLoader";

const ClassCell = ({ rowIndex, colIndex, searchQuery }) => {
  const [cellId, setCellId] = useState();
  const [courseName, setCourseName] = useState();
  const [courseTeacher, setCourseTeacher] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [link, setLink] = useState();
  const [isEditing, setEditing] = useState(false);
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [spinnerColor, setSpinnerColor] = useState("#ffffff");

  const handleEditClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    // Fetch initial data when component mounts
    setLoading(true);

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
      })
      .finally(() => {
        console.log("spinner");
        setLoading(false); // Set loading to false after data is fetched or on error
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
      {loading ? (
        // Show loading spinner
        <PropagateLoader color="#1aac83" />
      ) : (
        // Show content once data is fetched
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
