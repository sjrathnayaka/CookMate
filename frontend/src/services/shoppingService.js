import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const generateShoppingList = async (recipeIds) => {
  const response = await axios.post(`${API_BASE_URL}/api/shopping/generate`, recipeIds);
  return response.data;
};
