import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove authentication token from localStorage
    navigate('/login'); // Redirect user to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="logo">Inkwell</div>
      <div className="nav-links">
        <Link to="/about">About</Link> {/* Always accessible */}
        {isAuthenticated ? (
          <>
            <Link to="/write">Write</Link>
            {/* <Link to="/blogs">Blogs</Link>/ */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Write</Link> {/* Redirects to login if not authenticated */}
            {/* <Link to="/login">Blogs</Link> Redirects to login if not authenticated */}
            <Link to="/signup">Sign Up</Link> {/* Sign Up link only for unauthenticated users */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
