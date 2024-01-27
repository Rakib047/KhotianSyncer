import React from "react";

const NotificationModal = ({ onClose }) => {
  return (
    <div className="notification-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Notifications</h2>
        <ul>
          {/* Add your notifications here */}
          <li>New notification 1</li>
          <li>New notification 2</li>
          <li>New notification 3</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
    