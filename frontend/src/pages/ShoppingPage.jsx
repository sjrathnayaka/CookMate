import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateShoppingList } from '../services/shoppingService';
import RecipeSelector from '../components/mealplan/RecipeSelector';
import '../styles/shopping.css';

const ShoppingPage = () => {
  const [recipeIds, setRecipeIds] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const list = await generateShoppingList(recipeIds);
      navigate('/shopping/generated', { state: { shoppingList: list } });
    } catch (err) {
      console.error('Error generating shopping list:', err);
    }
  };

  return (
    <div className="shopping-page-container">
      <div className="content-wrapper">
        <h1 className="page-title">Shopping List Generator</h1>
        
        <div className="feature-description">
          Select recipes to include in your shopping list
        </div>
        
        <RecipeSelector selectedIds={recipeIds} onChange={setRecipeIds} />
        
        <div className="button-container">
          <button 
            onClick={fetchList} 
            disabled={recipeIds.length === 0}
            className={`generate-button ${recipeIds.length === 0 ? 'disabled' : ''}`}
          >
            Generate Shopping List
          </button>
        </div>
      </div>
    </div>
  );
};

  /*return (
    <div>
      <h1>Shopping List Generator</h1>
      <RecipeSelector selectedIds={recipeIds} onChange={setRecipeIds} />
      <button onClick={fetchList} disabled={recipeIds.length === 0}>
        Generate List
      </button>
    </div>
  );
};*/

export default ShoppingPage;
