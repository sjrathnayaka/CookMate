import React, { useState } from 'react';
import '../../styles/mealplan.css';

const MealPlanForm = ({ onSubmit, onCancel }) => {
  const today = new Date().toISOString().split('T')[0];
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 6);
  const endDate = oneWeekLater.toISOString().split('T')[0];

  const [mealPlan, setMealPlan] = useState({
    name: '',
    startDate: today,
    endDate: endDate,
    dayPlans: [] // This will be generated when submitting
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealPlan({
      ...mealPlan,
      [name]: value
    });
  };

  const generateDayPlans = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dayPlans = [];
    
    let currentDate = new Date(start);
    
    while (currentDate <= end) {
      dayPlans.push({
        date: new Date(currentDate).toISOString().split('T')[0],
        mealSlots: [
          { mealType: 'BREAKFAST', recipeId: null, tried: false },
          { mealType: 'LUNCH', recipeId: null, tried: false },
          { mealType: 'DINNER', recipeId: null, tried: false }
        ]
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dayPlans;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting meal plan:', mealPlan);
    
    // Generate day plans based on date range
    const dayPlans = generateDayPlans(mealPlan.startDate, mealPlan.endDate);
    
    // Call the onSubmit callback with the complete meal plan data
    onSubmit({
      ...mealPlan,
      dayPlans: dayPlans
    });
  };

  return (
    <div className="meal-plan-form-container">
      <h3>Create New Meal Plan</h3>
      <form onSubmit={handleSubmit} className="meal-plan-form">
        <div className="form-group">
          <label htmlFor="name">Plan Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={mealPlan.name}
            onChange={handleChange}
            required
            placeholder="Enter plan name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={mealPlan.startDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={mealPlan.endDate}
            onChange={handleChange}
            required
            min={mealPlan.startDate}
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="submit-button">Create Plan</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default MealPlanForm;