import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaSearch, FaBookOpen, FaCalendarAlt, FaShoppingBasket, FaUsers } from 'react-icons/fa';
import '../styles/CookMate.css';
const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="brand-highlight">CookMate</span></h1>
          <p className="hero-tagline">Your Ultimate Cooking Companion</p>
          <p className="hero-description">
            Discover recipes, plan meals, and connect with a community of food lovers
          </p>
          <div className="hero-buttons">
            <Link to="/recipes" className="primary-button">
              <FaSearch /> Explore Recipes
            </Link>
            <Link to="/meal-plans" className="secondary-button">
              <FaCalendarAlt /> Plan Your Meals
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://i.pinimg.com/736x/c7/62/5a/c7625a89cc85cdee799a2b535304bcaa.jpg" alt="Delicious food spread" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>How CookMate Works</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <h3>Discover Recipes</h3>
            <p>Search recipes by name, ingredients, cuisine, or dietary preferences</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Join the Community</h3>
            <p>Share recipes, like, comment, and follow other food enthusiasts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCalendarAlt />
            </div>
            <h3>Plan Your Meals</h3>
            <p>Create weekly meal plans by adding your favorite recipes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShoppingBasket />
            </div>
            <h3>Generate Shopping Lists</h3>
            <p>Automatically create shopping lists from your meal plans</p>
          </div>
          
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="featured-section">
        <h2>Featured Recipes</h2>
        <div className="featured-recipes">
          <div className="recipe-card">
            <div className="recipe-image">
              <img src="/api/placeholder/300/200" alt="Recipe" />
            </div>
            <div className="recipe-content">
              <h3>Spicy Shrimp Pasta</h3>
              <div className="recipe-meta">
                <span>30 min</span>
                <span>Medium</span>
              </div>
              <Link to="/recipes/1" className="view-recipe-button">View Recipe</Link>
            </div>
          </div>
          <div className="recipe-card">
            <div className="recipe-image">
              <img src="/api/placeholder/300/200" alt="Recipe" />
            </div>
            <div className="recipe-content">
              <h3>Vegetarian Buddha Bowl</h3>
              <div className="recipe-meta">
                <span>20 min</span>
                <span>Easy</span>
              </div>
              <Link to="/recipes/2" className="view-recipe-button">View Recipe</Link>
            </div>
          </div>
          <div className="recipe-card">
            <div className="recipe-image">
              <img src="/api/placeholder/300/200" alt="Recipe" />
            </div>
            <div className="recipe-content">
              <h3>Classic Beef Stew</h3>
              <div className="recipe-meta">
                <span>90 min</span>
                <span>Advanced</span>
              </div>
              <Link to="/recipes/3" className="view-recipe-button">View Recipe</Link>
            </div>
          </div>
        </div>
        <div className="view-all-container">
          <Link to="/recipes" className="view-all-button">Browse All Recipes</Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Cooking?</h2>
          <p>Join CookMate today and elevate your culinary journey!</p>
          <Link to="/signup" className="cta-button">Sign Up Now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;