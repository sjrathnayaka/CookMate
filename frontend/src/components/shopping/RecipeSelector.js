import React, { useEffect, useState } from 'react';
//import { fetchRecipes } from '../../services/recipeService';

const RecipeSelector = ({ selectedIds, onChange }) => {
  const [recipes, setRecipes] = useState([]);
/*
  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    loadRecipes();
  }, []);*/

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

export default RecipeSelector;
