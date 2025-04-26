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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchMealPlans();
    }
  }, [userId]);

  const fetchMealPlans = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await mealPlanService.getUserMealPlans(userId);
      // Ensure we always have an array even if the API returns nothing
      setMealPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Error fetching meal plans. Please try again later.');
      console.error('Error fetching meal plans:', error);
      // Set mealPlans to empty array on error
      setMealPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (mealPlanData) => {
    try {
      // Make sure the meal plan has the user ID
      if (!mealPlanData.userId) {
        mealPlanData.userId = userId;
      }
      await mealPlanService.createMealPlan(mealPlanData);
      await fetchMealPlans();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating meal plan:', error);
      setError('Error creating meal plan. Please try again.');
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleDeletePlan = async (planId) => {
    try {
      await mealPlanService.deleteMealPlan(planId);
      await fetchMealPlans();
      if (selectedPlan && selectedPlan.id === planId) {
        setSelectedPlan(null);
      }
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      setError('Error deleting meal plan. Please try again.');
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
          mealPlans={mealPlans} // This is now guaranteed to be an array
          onSelect={handleSelectPlan}
          onDelete={handleDeletePlan}
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