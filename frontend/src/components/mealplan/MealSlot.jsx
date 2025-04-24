import React, { useState } from 'react';

const MealSlot = ({ slot, editing, onClick, onMarkTried }) => {
  const [feedback, setFeedback] = useState('');
  
  return (
    <div 
      className={`meal-slot ${editing ? 'editable' : ''}`}
      onClick={onClick}
    >
      <div className="meal-header">
        <h5>{slot.mealType}</h5>
        {slot.recipeId ? (
          <span className="recipe-status">
            {slot.tried ? '✓ Tried' : 'Not tried yet'}
          </span>
        ) : (
          <span className="no-recipe">No recipe selected</span>
        )}
      </div>
      
      {slot.recipeId && !slot.tried && (
        <div className="mark-tried">
          <input
            type="text"
            placeholder="Feedback (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={() => onMarkTried(feedback)}>
            Mark as Tried
          </button>
        </div>
      )}
      
      {slot.tried && slot.feedback && (
        <div className="feedback">
          <p>Your feedback: {slot.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default MealSlot;