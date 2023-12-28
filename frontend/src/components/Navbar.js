import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  //console.log(user.username)
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            <span className="logo-khotian">Khotian</span>
            <span className="logo-syncer">Syncer</span>
          </h1>
        </Link>
        <nav>
          {user && (
            <div className="username-container">
              
              <span >{user.username}</span>
              
              <button
                className="material-symbols-outlined"
                onClick={handleClick}
              >
                logout
              </button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
