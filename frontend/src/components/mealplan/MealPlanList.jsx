import React from 'react';

const MealPlanList = ({ mealPlans, onSelect }) => {
  return (
    <div className="meal-plan-list">
      {mealPlans.length === 0 ? (
        <p>No meal plans found. Create your first one!</p>
      ) : (
        <ul>
          {mealPlans.map(plan => (
            <li key={plan.id} onClick={() => onSelect(plan)}>
              <h4>{plan.name}</h4>
              <span>
                {new Date(plan.startDate).toLocaleDateString()} - 
                {new Date(plan.endDate).toLocaleDateString()}
              </span>
              <p>{plan.dayPlans.length} days</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealPlanList;