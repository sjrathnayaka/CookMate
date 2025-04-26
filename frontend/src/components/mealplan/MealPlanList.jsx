import React from 'react';
import '../../styles/mealplan.css';

const MealPlanList = ({ mealPlans, onSelect, onDelete }) => {
  // Guard against undefined or null mealPlans
  const plansList = Array.isArray(mealPlans) ? mealPlans : [];
  
  if (plansList.length === 0) {
    return <p className="no-plans-message">No meal plans available. Create your first meal plan!</p>;
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="meal-plan-list">
      <h3>Your Meal Plans</h3>
      <div className="list-container">
        {plansList.map((plan) => (
          <div key={plan.id || Math.random().toString()} className="meal-plan-card">
            <div className="meal-plan-header">
              <h4>{plan.name || 'Unnamed Plan'}</h4>
              <div className="meal-plan-actions">
                <button
                  className="view-button"
                  onClick={() => onSelect(plan)}
                >
                  View
                </button>
                {onDelete && (
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this meal plan?')) {
                        onDelete(plan.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="meal-plan-dates">
              <span>From: {plan.startDate ? formatDate(plan.startDate) : 'Not set'}</span>
              <span>To: {plan.endDate ? formatDate(plan.endDate) : 'Not set'}</span>
            </div>
            <div className="meal-plan-summary">
              {plan.dayPlans && plan.dayPlans.length > 0 ? (
                <span>{plan.dayPlans.length} days planned</span>
              ) : (
                <span>No days planned yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanList;