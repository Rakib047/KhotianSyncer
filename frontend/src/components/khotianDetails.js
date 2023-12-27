import axios from "axios";
import React from "react";
import { useKhotianContext } from "../hooks/useKhotianContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const KhotianDetails = ({ singleKhotian }) => {
  const { dispatch } = useKhotianContext();
  const { user } = useAuthContext();

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
      <span className="delete-btn" onClick={handleClick}>
        Mark as Done
      </span>
    </div>
  );
};

export default KhotianDetails;
