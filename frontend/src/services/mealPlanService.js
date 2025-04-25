import axios from 'axios';

const API_URL = 'http://localhost:8081/api/meal-plans';

// Enhanced with error handling and logging
const createMealPlan = async (userId, mealPlanData) => {
  try {
    console.log('Sending meal plan data:', mealPlanData);
    const response = await axios.post(API_URL, mealPlanData, {
      headers: { 
        'userId': userId,
        'Content-Type': 'application/json'
      }
    });
    console.log('Create meal plan response:', response);
    return response;
  } catch (error) {
    console.error('Error creating meal plan:', error.response || error);
    throw error;
  }
};

const getUserMealPlans = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response;
  } catch (error) {
    console.error('Error getting meal plans:', error);
    throw error;
  }
};

// Implement the missing getMealPlanById function
const getMealPlanById = async (userId, mealPlanId) => {
  try {
    const response = await axios.get(`${API_URL}/${mealPlanId}`, {
      headers: { 
        'userId': userId,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error getting meal plan:', error);
    throw error;
  }
};

const updateMealPlan = async (userId, mealPlanId, mealPlanData) => {
  try {
    const response = await axios.put(`${API_URL}/${mealPlanId}`, mealPlanData, {
      headers: { 
        'userId': userId,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating meal plan:', error);
    throw error;
  }
};

const deleteMealPlan = async (userId, mealPlanId) => {
  try {
    const response = await axios.delete(`${API_URL}/${mealPlanId}`, {
      headers: { 
        'userId': userId,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    throw error;
  }
};

const markRecipeAsTried = async (userId, mealPlanId, recipeId, feedback) => {
  try {
    const response = await axios.patch(`${API_URL}/${mealPlanId}/mark-tried`, null, {
      params: { recipeId, feedback },
      headers: { 
        'userId': userId,
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error('Error marking recipe as tried:', error);
    throw error;
  }
};

export default {
  createMealPlan,
  getUserMealPlans,
  getMealPlanById,
  updateMealPlan,
  deleteMealPlan,
  markRecipeAsTried
};