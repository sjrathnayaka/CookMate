import axios from 'axios';

const API_URL = 'http://localhost:8081/api/meal-plans';

const createMealPlan = async (userId, mealPlanData) => {
  try {
    console.log('Submitting meal plan:', { userId, ...mealPlanData });
    const response = await axios.post(API_URL, {
      ...mealPlanData,
      userId // Include userId in the body as well as header
    }, {
      headers: { 
        'userId': userId,
        'Content-Type': 'application/json'
      }
    });
    console.log('Meal plan created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating meal plan:', {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error(error.response?.data?.message || 'Failed to create meal plan');
  }
};

// ... keep other methods the same ...

export default {
  createMealPlan,
  getUserMealPlans,
  getMealPlanById,
  updateMealPlan,
  deleteMealPlan,
  markRecipeAsTried
};