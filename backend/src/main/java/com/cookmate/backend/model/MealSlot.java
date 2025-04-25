package com.cookmate.backend.model;


import lombok.Data;

@Data
public class MealSlot {
    private String mealType; // e.g., "Breakfast", "Lunch", "Dinner"
    private String recipeId;
    private boolean tried;
    private String feedback;
}