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
    userId: "test-user-id", // Replace with logged-in user if needed
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append(
      "recipe",
      new Blob([
        JSON.stringify({
          ...recipe,
          ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
        }),
      ], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await axios.post("http://localhost:8081/api/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Recipe uploaded successfully!");
      console.log("Uploaded:", res.data);
      // Optional: clear form
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
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <input
        type="text"
        name="title"
        value={recipe.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
        placeholder="Ingredients (comma separated)"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
        placeholder="Instructions"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="cuisine"
        value={recipe.cuisine}
        onChange={handleChange}
        placeholder="Cuisine"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="difficulty"
        value={recipe.difficulty}
        onChange={handleChange}
        placeholder="Difficulty (Easy, Medium, Hard)"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="cookingTime"
        value={recipe.cookingTime}
        onChange={handleChange}
        placeholder="Cooking Time (minutes)"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
