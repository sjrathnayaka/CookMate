import React from 'react';
import MealSlot from './MealSlot';

const DayPlan = ({ dayPlan, editing, onSlotClick, onMarkTried }) => {
  return (
    <div className="day-plan">
      <h4>{new Date(dayPlan.date).toLocaleDateString()}</h4>
      <div className="meal-slots">
        {dayPlan.mealSlots.map((slot, index) => (
          <MealSlot
            key={index}
            slot={slot}
            editing={editing}
            onClick={() => onSlotClick(slot.mealType)}
            onMarkTried={(feedback) => 
              slot.recipeId && onMarkTried(dayPlan.date, slot.mealType, slot.recipeId, feedback)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DayPlan;