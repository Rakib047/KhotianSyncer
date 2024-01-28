import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import NotificationModal from "./Notification/NotificationModal";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  //console.log(user.username)
  const handleClick = () => {
    logout();
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOpenNotificationModal = () => {
    setShowNotificationModal(true);
  };

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
  };

  return (
    <header>
      <div className="container">
        {user && (
          <>
            <input type="checkbox" id="menu-toggle" checked={sidebarOpen} />
            <label
              htmlFor="menu-toggle"
              className="menu-icon"
              onClick={handleToggleSidebar}
            >
              <i className="fa fa-bars"></i>
            </label>

            <div className="slideout-sidebar">
              <ul>
                <li>
                  <Link
                    to="/"
                    className="sidebarLink"
                    onClick={handleToggleSidebar}
                  >
                    Khotian
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="sidebarLink"
                    onClick={handleToggleSidebar}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resource"
                    className="sidebarLink"
                    onClick={handleToggleSidebar}
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    to="/routine"
                    className="sidebarLink"
                    onClick={handleToggleSidebar}
                  >
                    Class Routine
                  </Link>
                </li>
                <li>
                  <Link
                    to="/discussion"
                    className="sidebarLink"
                    onClick={handleToggleSidebar}
                  >
                    Discussion
                  </Link>
                </li>
                <li
                  onClick={() => {
                    handleToggleSidebar();
                    window.open("https://moodle.cse.buet.ac.bd/");
                  }}
                >
                  Moodle
                </li>
                <li
                  onClick={() => {
                    handleToggleSidebar();
                    window.open("https://biis.buet.ac.bd/");
                  }}
                >
                  BIIS
                </li>
                <li onClick={handleToggleSidebar}>Notices</li>
              </ul>
            </div>
          </>
        )}

        <Link to="/">
          <h1>
            <span className="logo-khotian">
              <i class="fa-brands fa-connectdevelop"></i> CSE
            </span>
            <span className="logo-syncer">Connect</span>
          </h1>
        </Link>
        <nav>
          {user && (
            <div className="username-container">
              <button onClick={handleOpenNotificationModal}>
                <i className="fa-solid fa-bell"></i>
              </button>

              <Link to="/profile">
                <i class="fa-solid fa-user"></i> {user.username}
              </Link>

              <button onClick={handleClick}>
                <i class="fa-solid fa-right-from-bracket"></i> <b>logout</b>
              </button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login">
                <i class="fa-solid fa-right-to-bracket"></i> Login
              </Link>
              <Link to="/signup">
                <i class="fa-solid fa-address-card"></i> Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
      {showNotificationModal && (
        <NotificationModal onClose={handleCloseNotificationModal} />
      )}
    </header>
  );
};

export default Navbar;
