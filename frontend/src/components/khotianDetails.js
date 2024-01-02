import axios from "axios";
import React, { useState, useEffect } from "react";
import { useKhotianContext } from "../hooks/useKhotianContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import KhotianEdit from "./KhotianEdit";

const KhotianDetails = ({ singleKhotian }) => {
  const { khotianList, dispatch } = useKhotianContext();
  const { user } = useAuthContext();
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    // This effect will run whenever khotianList changes
    // Reload the page
  }, [khotianList]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditClose = () => {
    setEditing(false);
  };

  const handleUpdate = (updatedKhotian) => {
    dispatch({ type: "UPDATE_KHOTIAN", payload: updatedKhotian });
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(`/api/khotian/${singleKhotian._id}`, {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      });

      if (response.status === 200) {
        const json = response.data;
        dispatch({ type: "DELETE_KHOTIAN", payload: json });
      }
      // Show error message using SweetAlert
      Swal.fire({
        icon: "success",
        title: `${response.data.taskTitle}:${response.data.taskType} Done!`,
        text: "Congratulation!",
        confirmButtonColor: "#1aac83",
        background: "#f1f1f1",
      });
    } catch (error) {
      // Handle error, e.g., set an error state or dispatch an error action
      console.error("Error deleting khotian:", error);
    }
  };

  // Format date to DD-MM-YYYY or use the existing format
  const formatDate = (dateString) => {
    //console.log(dateString)  
  
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      return dateString; // If the date is invalid, return the original string
    }
    
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return dateObject.toLocaleDateString("en-US", options);
  };

  return (
    <div className="khotian-details">
      <h4>
        {singleKhotian.taskTitle} : {singleKhotian.taskType}
      </h4>
      <p>
        <strong>Task Details :</strong> {singleKhotian.taskDetail}
      </p>
      <p>
        <strong>Date :</strong> {formatDate(singleKhotian.date)}
      </p>
      <p>
        <strong>Priority :</strong> {singleKhotian.priority}
      </p>
      <button className="delete-btn" onClick={handleClick}>
        <i class="fa-regular fa-circle-check"></i> <b>Turn In</b>
      </button>
      {!isEditing? (
        <button className="edit-btn" onClick={handleEditClick}>
          <i class="fa-solid fa-pen-to-square"></i> <b>Edit</b>
        </button>
      )
      :
      (
        <button className="cancel-btn" onClick={handleEditClose}>
        <i class="fa-sharp fa-solid fa-xmark"></i> <b>Cancel</b>
        </button>
      )
    }

      {isEditing && (
        <KhotianEdit
          singleKhotian={singleKhotian}
          onClose={handleEditClose}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default KhotianDetails;
