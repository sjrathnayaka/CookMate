import axios from 'axios';

const API_URL = 'http://localhost:8081/api/meal-plans';

// Create axios instance with default headers
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (userId) {
    config.headers['userId'] = userId;
  }
  
  return config;
});

const mealPlanService = {
  createMealPlan: async (mealPlanData) => {
    console.log('Sending meal plan data:', mealPlanData);
    try {
      // Make sure userId is set in the meal plan data
      if (!mealPlanData.userId) {
        const userId = localStorage.getItem('userId');
        if (userId) {
          mealPlanData.userId = userId;
        }
      }
      const response = await apiClient.post('', mealPlanData);
      return response.data;
    } catch (error) {
      console.error('Error creating meal plan:', error);
      throw error;
    }
  },
  
  getUserMealPlans: async (userId) => {
    try {
      const response = await apiClient.get(`/user/${userId}`);
      return response.data; // Return just the data, not wrapped in {data: ...}
    } catch (error) {
      console.error('Error fetching user meal plans:', error);
      throw error;
    }
  },
  
  getAllMealPlans: async () => {
    try {
      const response = await apiClient.get('/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all meal plans:', error);
      throw error;
    }
  },
  
  getMealPlanById: async (mealPlanId) => {
    try {
      const response = await apiClient.get(`/${mealPlanId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching meal plan with id ${mealPlanId}:`, error);
      throw error;
    }
  },
  
  updateMealPlan: async (mealPlanId, mealPlanData) => {
    try {
      const response = await apiClient.put(`/${mealPlanId}`, mealPlanData);
      return response.data;
    } catch (error) {
      console.error(`Error updating meal plan with id ${mealPlanId}:`, error);
      throw error;
    }
  },
  
  deleteMealPlan: async (mealPlanId) => {
    try {
      await apiClient.delete(`/${mealPlanId}`);
      return true;
    } catch (error) {
      console.error(`Error deleting meal plan with id ${mealPlanId}:`, error);
      throw error;
    }
  },
  
  markRecipeAsTried: async (mealPlanId, recipeId, feedback = '') => {
    try {
      const response = await apiClient.patch(
        `/${mealPlanId}/mark-tried?recipeId=${recipeId}&feedback=${encodeURIComponent(feedback)}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error marking recipe as tried:`, error);
      throw error;
    }
  }
};

export default mealPlanService;