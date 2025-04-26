import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaSearch, FaCalendarAlt, FaShoppingBasket, FaUsers, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import '../../styles/CookMate.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="brand-section">
          <Link to="/" className="nav-logo">
            <FaUtensils className="logo-icon" /> CookMate
          </Link>
        </div>
        
        <div className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <Link to="/community" className="nav-link nav-link-highlight">
            <FaUsers className="nav-icon" />
            <span className="nav-text">Community</span>
          </Link>
          <Link to="/" className="nav-link">
            <span className="nav-text">Home</span>
          </Link>
          <Link to="/recipes" className="nav-link">
            <span className="nav-text">Recipes</span>
          </Link>
          <Link to="/meal-plans" className="nav-link">
            <span className="nav-text">Meal Plans</span>
          </Link>
          <Link to="/shopping-list" className="nav-link">
            <span className="nav-text">Shopping List</span>
          </Link>
        </div>
        
        <div className="nav-actions">
          <Link to="/search" className="icon-button">
            <FaSearch />
          </Link>
          <div className="profile-dropdown-container">
            <button 
              className="profile-button" 
              onClick={toggleProfileDropdown}
              aria-haspopup="true"
              aria-expanded={isProfileDropdownOpen}
            >
              <FaUserCircle />
            </button>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/login" className="dropdown-item">Login</Link>
                <Link to="/signup" className="dropdown-item">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;