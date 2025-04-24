// pages/MealPlansPage.jsx
import React, { useState, useEffect } from 'react';
import MealPlanList from '../components/mealplan/MealPlanList';
import MealPlanForm from '../components/mealplan/MealPlanForm';
import mealPlanService from '../services/mealPlanService';
import '../styles/mealplan.css';

const MealPlansPage = ({ userId }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchMealPlans();
  }, [userId]);

  const fetchMealPlans = async () => {
    try {
      const response = await mealPlanService.getUserMealPlans(userId);
      setMealPlans(response.data);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    }
  };

  const handleCreate = async (mealPlanData) => {
    try {
      await mealPlanService.createMealPlan(userId, mealPlanData);
      fetchMealPlans();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating meal plan:', error);
    }
  };

  return (
    <div className="meal-plans-container">
      <h2>My Meal Plans</h2>
      <button 
        className="create-button"
        onClick={() => setIsCreating(true)}
      >
        Create New Meal Plan
      </button>
      
      {isCreating && (
        <MealPlanForm 
          onSubmit={handleCreate} 
          onCancel={() => setIsCreating(false)}
        />
      )}
      
      <MealPlanList 
        mealPlans={mealPlans}
        onSelect={setSelectedPlan}
      />
      
      {selectedPlan && (
        <MealPlanView 
          mealPlan={selectedPlan}
          userId={userId}
          onClose={() => setSelectedPlan(null)}
          onUpdate={fetchMealPlans}
        />
      )}
    </div>
  );
};

export default MealPlansPage;