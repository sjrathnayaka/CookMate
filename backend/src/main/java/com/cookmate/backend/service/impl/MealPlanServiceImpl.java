package com.cookmate.backend.service.impl;

import com.cookmate.backend.model.MealPlan;
import com.cookmate.backend.repository.MealPlanRepository;
import com.cookmate.backend.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.util.List;


@Service
public class MealPlanServiceImpl implements MealPlanService {

    private final MealPlanRepository mealPlanRepository;

    @Autowired
    public MealPlanServiceImpl(MealPlanRepository mealPlanRepository) {
        this.mealPlanRepository = mealPlanRepository;
    }

    @Override
    public MealPlan createMealPlan(MealPlan mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }

    @Override
    public List<MealPlan> getUserMealPlans(String userId) {
        return mealPlanRepository.findByUserId(userId);
    }

    @Override
    public MealPlan getMealPlanById(String userId, String mealPlanId) {
        return mealPlanRepository.findById(mealPlanId)
                .filter(plan -> plan.getUserId().equals(userId))
                .orElseThrow(() -> new RuntimeException("Meal plan not found"));
    }

    @Override
    public MealPlan updateMealPlan(String userId, MealPlan mealPlan) {
        if (!mealPlan.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to update this meal plan");
        }
        return mealPlanRepository.save(mealPlan);
    }

    @Override
    public void deleteMealPlan(String userId, String mealPlanId) {
        mealPlanRepository.deleteByUserIdAndId(userId, mealPlanId);
    }

    @Override
    public MealPlan markRecipeAsTried(String userId, String mealPlanId, String recipeId, String feedback) {
        MealPlan mealPlan = getMealPlanById(userId, mealPlanId);
        
        mealPlan.getDayPlans().forEach(dayPlan -> 
            dayPlan.getMealSlots().forEach(mealSlot -> {
                if (mealSlot.getRecipeId().equals(recipeId)) {
                    mealSlot.setTried(true);
                    mealSlot.setFeedback(feedback);
                }
            })
        );
        
        return mealPlanRepository.save(mealPlan);
    }
}