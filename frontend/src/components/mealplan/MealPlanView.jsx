// components/mealplan/MealPlanView.jsx
import React, { useState } from 'react';
import DayPlan from './DayPlan';
import RecipeSelector from './RecipeSelector';
import mealPlanService from '../../services/mealPlanService';

const MealPlanView = ({ mealPlan, userId, onClose, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [updatedPlan, setUpdatedPlan] = useState(mealPlan);

  const handleRecipeSelect = async (recipeId) => {
    if (!selectedSlot) return;
    
    // Find and update the specific meal slot
    const updatedDayPlans = updatedPlan.dayPlans.map(dayPlan => {
      if (dayPlan.date === selectedSlot.dayDate) {
        return {
          ...dayPlan,
          mealSlots: dayPlan.mealSlots.map(slot => {
            if (slot.mealType === selectedSlot.mealType) {
              return { ...slot, recipeId };
            }
            return slot;
          })
        };
      }
      return dayPlan;
    });
    
    setUpdatedPlan({ ...updatedPlan, dayPlans: updatedDayPlans });
    setSelectedSlot(null);
  };

  const handleMarkAsTried = async (dayDate, mealType, recipeId, feedback) => {
    try {
      await mealPlanService.markRecipeAsTried(
        userId, 
        mealPlan.id, 
        recipeId, 
        feedback
      );
      onUpdate();
    } catch (error) {
      console.error('Error marking recipe as tried:', error);
    }
  };

  const handleSave = async () => {
    try {
      await mealPlanService.updateMealPlan(userId, updatedPlan);
      onUpdate();
      setEditing(false);
    } catch (error) {
      console.error('Error updating meal plan:', error);
    }
  };

  return (
    <div className="meal-plan-view">
      <div className="meal-plan-header">
        <h3>{updatedPlan.name}</h3>
        <span>
          {new Date(updatedPlan.startDate).toLocaleDateString()} - 
          {new Date(updatedPlan.endDate).toLocaleDateString()}
        </span>
        <button onClick={onClose}>Close</button>
      </div>
      
      <div className="meal-plan-actions">
        {editing ? (
          <>
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>Edit Plan</button>
        )}
      </div>
      
      <div className="day-plans-container">
        {updatedPlan.dayPlans.map(dayPlan => (
          <DayPlan
            key={dayPlan.date}
            dayPlan={dayPlan}
            editing={editing}
            onSlotClick={(mealType) => editing && setSelectedSlot({
              dayDate: dayPlan.date,
              mealType
            })}
            onMarkTried={handleMarkAsTried}
          />
        ))}
      </div>
      
      {selectedSlot && (
        <RecipeSelector 
          onSelect={handleRecipeSelect}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </div>
  );
};

export default MealPlanView;