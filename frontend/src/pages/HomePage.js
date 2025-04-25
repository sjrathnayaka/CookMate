import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to CookMate</h1>
      <p>Your Ultimate Cooking Companion</p>
      <div className="home-actions">
        <Link to="/meal-plans" className="home-button">View Meal Plans</Link>
        {/* Add other action buttons as needed */}
      </div>
    </div>
  );
};

export default HomePage;