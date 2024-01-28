import React, { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/user/notification",{
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
          },
        });
        console.log(response.data)
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              actorName={notification.actorName}
              type={notification.type}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
