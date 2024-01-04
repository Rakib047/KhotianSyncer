import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [sidebarOpen,setSidebarOpen] = useState(false)

  //console.log(user.username)
  const handleClick = () => {
    logout();
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  return (
    <header>
      <div className="container">
        
      {user && (
          <>
            <input type="checkbox" id="menu-toggle" checked={sidebarOpen}/>
            <label htmlFor="menu-toggle" className="menu-icon" onClick={handleToggleSidebar}>
              <i className="fa fa-bars"></i>
            </label>

            <div className="slideout-sidebar">
              <ul>
                <li><Link to="/" className="sidebarLink" onClick={handleToggleSidebar}>Home</Link></li>
                <li><Link to="/profile" className="sidebarLink" onClick={handleToggleSidebar}>Profile</Link></li>
                <li><Link to="/resource" className="sidebarLink" onClick={handleToggleSidebar}>Resources</Link></li>
                <li onClick={handleToggleSidebar}>Discussion Forum</li>
                <li onClick={handleToggleSidebar}>Contact</li>
              </ul>
            </div>
          </>
        )}


        <Link to="/">
          <h1>
            <span className="logo-khotian">
              <i class="fa-solid fa-clipboard-list"> </i> Khotian
            </span>
            <span className="logo-syncer">Syncer</span>
          </h1>
        </Link>
        <nav>
          {user && (
            <div className="username-container">
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
    </header>
  );
};

export default Navbar;
