import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationModal = ({ onClose }) => {
  return (
    <div className="notification-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Notifications</h2>
        <ul>
          <NotificationItem text="New notification 1" />
          <NotificationItem text="New notification 2" />
          <NotificationItem text="New notification 3" />
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
