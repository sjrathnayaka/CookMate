// src/pages/GeneratedShoppingListPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingList from '../components/shopping/ShoppingList';

const GeneratedShoppingListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const list = location.state?.shoppingList || [];

  if (list.length === 0) {
    // If no data passed, redirect back to /shopping
    navigate('/shopping');
    return null;
  }

  return (
    <div>
      <h1>Generated Shopping List</h1>
      <ShoppingList list={list} />
    </div>
  );
};

export default GeneratedShoppingListPage;
