import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../compCSS/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/"); 
  };

  const navLinkStyles = ({ isActive }) => ({
    color: isActive ? '#000000' : '#ffffff',
    textDecoration: 'none', 
  });

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" style={navLinkStyles}>
          <span className="logo-part FP">FP</span>
          <span className="logo-part way">way</span>
        </NavLink>
      </div>
      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" style={navLinkStyles} onClick={toggleMobileMenu}>Home</NavLink>
        <NavLink to="/explore" style={navLinkStyles} onClick={toggleMobileMenu}>Explore</NavLink>
        {isLoggedIn && <NavLink to="/profile" style={navLinkStyles} onClick={toggleMobileMenu}>Profile</NavLink>}
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink className="login_link" to="/login" style={navLinkStyles} onClick={toggleMobileMenu}>Login</NavLink>
        )}
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <span className="close-icon">&times;</span>
        ) : (
          <span className="hamburger-icon">&#9776;</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
