import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuthContext } from "../hooks/useAuthContext";

const KhotianEdit = ({ singleKhotian, onClose, onUpdate }) => {
  const [editedKhotian, setEditedKhotian] = useState({ ...singleKhotian });
  const { user } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedKhotian((prevKhotian) => ({
      ...prevKhotian,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {

    if (!user) {
        return;
    }

    try {
        const response = await axios.patch(
            `/api/khotian/${editedKhotian._id}`,
            editedKhotian,
            {
              headers: {
                Authorization: `Bearer ${user.jwtToken}`,
              },
            }
        );
      

      if (response.status === 200) {
        const updatedKhotian = response.data;
        onUpdate(updatedKhotian);
        Swal.fire({
          icon: "success",
          title: "Task Updated!",
          text: "Your task has been updated successfully.",
          confirmButtonColor: "#1aac83",
          background: "#f1f1f1",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error updating khotian:", error);
    }
  };

  return (
    <div className="edit-form">
      <label>
        Task Title:
        <input
          type="text"
          name="taskTitle"
          value={editedKhotian.taskTitle}
          onChange={handleChange}
        />
      </label>
      <label>
        Task Type:
        <input
          type="text"
          name="taskType"
          value={editedKhotian.taskType}
          onChange={handleChange}
        />
      </label>
      <label>
        Task Details:
        <textarea
          name="taskDetail"
          value={editedKhotian.taskDetail}
          onChange={handleChange}
        />
      </label>
      <label>
        Priority:
        <input
          type="text"
          name="priority"
          value={editedKhotian.priority}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={editedKhotian.date}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default KhotianEdit;
