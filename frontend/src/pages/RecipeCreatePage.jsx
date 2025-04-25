import React from "react";
import RecipeForm from "../components/RecipeForm";

const RecipeCreatePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Recipe</h2>
      <RecipeForm />
    </div>
  );
};

export default RecipeCreatePage;
