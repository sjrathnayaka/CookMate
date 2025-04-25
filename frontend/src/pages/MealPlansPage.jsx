import React, { useState, useEffect } from 'react';
import MealPlanList from '../components/mealplan/MealPlanList';
import MealPlanForm from '../components/mealplan/MealPlanForm';
import mealPlanService from '../services/mealPlanService';
import MealPlanView from '../components/mealplan/MealPlanView';
import '../styles/mealplan.css';

const MealPlansPage = ({ userId }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    if (userId) {
      fetchMealPlans();
    }
  }, [userId]);

  const fetchMealPlans = async () => {
    setIsLoading(true);  // Set loading state before fetching
    setError(null);  // Reset error state
    try {
      const response = await mealPlanService.getUserMealPlans(userId);
      setMealPlans(response.data);
    } catch (error) {
      setError('Error fetching meal plans. Please try again later.');
      console.error('Error fetching meal plans:', error);
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  const handleCreate = async (mealPlanData) => {
    try {
      await mealPlanService.createMealPlan(userId, mealPlanData);
      await fetchMealPlans();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating meal plan:', error);
    }
  };

  const handleSelectPlan = async (plan) => {
    try {
      setSelectedPlan(plan);
    } catch (error) {
      console.error('Error selecting meal plan:', error);
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

      {isLoading ? (
        <p>Loading meal plans...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MealPlanList 
          mealPlans={mealPlans}
          onSelect={handleSelectPlan}
        />
      )}

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
