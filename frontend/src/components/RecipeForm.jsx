import React, { useState } from "react";
import axios from "axios";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    difficulty: "",
    cookingTime: "",
    userId: "test-user-id", // Replace with actual user ID if needed
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "recipe",
        new Blob(
          [
            JSON.stringify({
              ...recipe,
              ingredients: recipe.ingredients
                .split(",")
                .map((item) => item.trim()),
            }),
          ],
          { type: "application/json" }
        )
      );

      if (file) {
        formData.append("file", file);
      }

      // 🔑 Get token from localStorage (or wherever you're storing it)
      const token = localStorage.getItem("token"); 

      // ⚠️ Optional: Handle case where token is missing
      if (!token) {
        alert("You need to be logged in to submit a recipe.");
        setLoading(false);
        return;
      }

      // 📨 Send request with JWT token in the Authorization header
      const response = await axios.post(
        "http://localhost:8081/api/recipes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Recipe uploaded successfully!");
      console.log("Uploaded:", response.data);

      // Reset form
      setRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        cuisine: "",
        difficulty: "",
        cookingTime: "",
        userId: "test-user-id",
      });
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl"
    >
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Share Your Recipe
      </h2>

      <div className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-semibold text-gray-700">
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={recipe.title}
            onChange={handleChange}
            placeholder="Enter the recipe title"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Ingredients */}
        <div className="flex flex-col">
          <label htmlFor="ingredients" className="text-lg font-semibold text-gray-700">
            Ingredients (comma separated)
          </label>
          <input
            type="text"
            name="ingredients"
            id="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            placeholder="List of ingredients"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Instructions */}
        <div className="flex flex-col">
          <label htmlFor="instructions" className="text-lg font-semibold text-gray-700">
            Instructions
          </label>
          <textarea
            name="instructions"
            id="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            placeholder="Step-by-step instructions"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Cuisine and Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="cuisine" className="text-lg font-semibold text-gray-700">
              Cuisine Type
            </label>
            <input
              type="text"
              name="cuisine"
              id="cuisine"
              value={recipe.cuisine}
              onChange={handleChange}
              placeholder="E.g., Italian, Asian"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="difficulty" className="text-lg font-semibold text-gray-700">
              Difficulty Level
            </label>
            <input
              type="text"
              name="difficulty"
              id="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              placeholder="E.g., Easy, Medium, Hard"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Cooking Time */}
        <div className="flex flex-col">
          <label htmlFor="cookingTime" className="text-lg font-semibold text-gray-700">
            Cooking Time (in minutes)
          </label>
          <input
            type="number"
            name="cookingTime"
            id="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            placeholder="How long will it take?"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="file" className="text-lg font-semibold text-gray-700">
            Upload Recipe Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 mt-6"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
