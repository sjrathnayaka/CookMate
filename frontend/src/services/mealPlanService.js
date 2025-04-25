// services/mealPlanService.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/meal-plans';

const createMealPlan = (userId, mealPlanData) => {
  return axios.post(API_URL, mealPlanData, {
    headers: { userId }
  });
};

const getUserMealPlans = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

const getMealPlanById = (userId, mealPlanId) => {
  return axios.get(`${API_URL}/${mealPlanId}`, {
    headers: { userId }
  });
};

const updateMealPlan = (userId, mealPlanId, mealPlanData) => {
  return axios.put(`${API_URL}/${mealPlanId}`, mealPlanData, {
    headers: { userId }
  });
};

const deleteMealPlan = (userId, mealPlanId) => {
  return axios.delete(`${API_URL}/${mealPlanId}`, {
    headers: { userId }
  });
};

const markRecipeAsTried = (userId, mealPlanId, recipeId, feedback) => {
  return axios.patch(`${API_URL}/${mealPlanId}/mark-tried`, null, {
    params: { recipeId, feedback },
    headers: { userId }
  });
};

export default {
  createMealPlan,
  getUserMealPlans,
  getMealPlanById,
  updateMealPlan,
  deleteMealPlan,
  markRecipeAsTried
};