package com.cookmate.backend.service;
import com.cookmate.backend.model.MealPlan;
import java.util.List;

public interface MealPlanService {
    MealPlan createMealPlan(MealPlan mealPlan);
    List<MealPlan> getUserMealPlans(String userId);
    MealPlan getMealPlanById(String userId, String mealPlanId);
    MealPlan updateMealPlan(String userId, MealPlan mealPlan);
    void deleteMealPlan(String userId, String mealPlanId);
    MealPlan markRecipeAsTried(String userId, String mealPlanId, String recipeId, String feedback);
}