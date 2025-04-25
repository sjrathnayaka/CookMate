import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeSelector = ({ onSelect, onClose }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/recipes`);
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-selector-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Select a Recipe</h3>
        
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <div className="recipe-list">
            {filteredRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="recipe-item"
                onClick={() => onSelect(recipe.id)}
              >
                <img src={recipe.imageUrl} alt={recipe.name} />
                <h4>{recipe.name}</h4>
                <p>{recipe.cuisine}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeSelector;