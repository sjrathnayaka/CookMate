// src/pages/ShoppingPage.jsx
import React, { useState } from 'react';
import { generateShoppingList } from '../services/shoppingService';
import ShoppingList from '../components/shopping/ShoppingList';

const ShoppingPage = () => {
  const [recipeIds, setRecipeIds] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const fetchList = async () => {
    const list = await generateShoppingList(recipeIds);
    setShoppingList(list);
  };

  return (
    <div>
      <h1>Shopping List Generator</h1>
      {/* Add a recipe selector component here */}
      <button onClick={fetchList}>Generate List</button>
      {shoppingList.length > 0 && <ShoppingList list={shoppingList} />}
    </div>
  );
};

export default ShoppingPage;
