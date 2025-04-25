import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <Link to="/" className="nav-logo">CookMate</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/meal-plans">Meal Plans</Link>
      </div>
    </nav>
  );
};

export default Navigation;
