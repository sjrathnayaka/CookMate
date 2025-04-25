// src/components/shopping/ShoppingList.jsx
import React from 'react';

const ShoppingList = ({ list }) => {
  const handleDownload = () => {
    const content = list.map(item => 
      `${item.name} - ${item.quantity} ${item.unit}`).join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'shopping-list.txt';
    link.click();
  };

  return (
    <div>
      <h2>Your Shopping List</h2>
      <ul>
        {list.map((item, i) => (
          <li key={i}>
            {item.name}: {item.quantity} {item.unit}
          </li>
        ))}
      </ul>
      <button onClick={handleDownload}>Download List</button>
    </div>
  );
};

export default ShoppingList;
