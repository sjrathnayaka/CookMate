import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/recipeSelector.css';

const RecipeSelector = ({ selectedIds, onChange }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/recipes`);
        setRecipes(response.data);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleToggle = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((r) => r !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-selector">
      <h2 className="section-title">Select Recipes</h2>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="loading-message">Loading recipes...</div>
      ) : filteredRecipes.length > 0 ? (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              className={`recipe-card ${selectedIds.includes(recipe.id) ? 'selected' : ''}`}
              onClick={() => handleToggle(recipe.id)}
            >
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.name}</h3>
                <p className="recipe-cuisine">{recipe.cuisine}</p>
              </div>
              
              <div className="recipe-footer">
                <div className={`selection-indicator ${selectedIds.includes(recipe.id) ? 'selected' : ''}`}>
                  {selectedIds.includes(recipe.id) && <span className="checkmark">✓</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-recipes-message">
          No recipes found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default RecipeSelector;
/*
  return (
    <div className="recipe-selector">
      <h3>Select Recipes</h3>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(recipe.id)}
                  onChange={() => handleToggle(recipe.id)}
                />
                {recipe.name} ({recipe.cuisine})
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeSelector;


/*import React, { useEffect, useState } from 'react';
//import { fetchRecipes } from '../../services/recipeService';

const RecipeSelector = ({ selectedIds, onChange }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    loadRecipes();
  }, []);

  const handleToggle = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((r) => r !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div>
      <h3>Select Recipes</h3>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(recipe.id)}
                onChange={() => handleToggle(recipe.id)}
              />
              {recipe.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSelector;*/
