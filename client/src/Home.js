

//Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import IM from "./image.png";
import Navbar from './Navbar';

function HomePage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login'); 
  };
  const handleAbout = () => {
    navigate('/about');  
  };

  return (
    <div className="home-container">
      {/* <nav className="navbar">
        <div className="logo">Inkwell</div>
        <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/">Write</Link>
        <Link to="/">Blogs</Link>
        </div>
      </nav> */}
      <Navbar/>
      <header className="hero-section">
        <div className="hero-content">
          <div className='heading'>
          <h1>Blogging Made Simple,<br/> Stories Made Stronger.</h1>
          <h1></h1>
          </div>
          <div className='button'>
            <button className="signin-button" onClick={handleSignIn}>
            Sign In
          </button></div>
          
         
        </div>
        <div className="hero-image">
          <img src={IM} alt="Fountain Pen" />
        </div>
      </header>
    </div>
  );
}

export default HomePage;

