package com.cookmate.backend.controller;

import com.cookmate.backend.model.MealPlan;
import com.cookmate.backend.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/meal-plans")
public class MealPlanController {

    private final MealPlanService mealPlanService;

    @Autowired
    public MealPlanController(MealPlanService mealPlanService) {
        this.mealPlanService = mealPlanService;
    }

    @PostMapping
    public ResponseEntity<MealPlan> createMealPlan(@RequestBody MealPlan mealPlan) {
        return ResponseEntity.ok(mealPlanService.createMealPlan(mealPlan));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MealPlan>> getUserMealPlans(@PathVariable String userId) {
        return ResponseEntity.ok(mealPlanService.getUserMealPlans(userId));
    }

    @GetMapping("/{mealPlanId}")
    public ResponseEntity<MealPlan> getMealPlanById(
            @RequestHeader("userId") String userId,
            @PathVariable String mealPlanId) {
        return ResponseEntity.ok(mealPlanService.getMealPlanById(userId, mealPlanId));
    }

    @PutMapping("/{mealPlanId}")
    public ResponseEntity<MealPlan> updateMealPlan(
            @RequestHeader("userId") String userId,
            @PathVariable String mealPlanId,
            @RequestBody MealPlan mealPlan) {
        mealPlan.setId(mealPlanId);
        return ResponseEntity.ok(mealPlanService.updateMealPlan(userId, mealPlan));
    }

    @DeleteMapping("/{mealPlanId}")
    public ResponseEntity<Void> deleteMealPlan(
            @RequestHeader("userId") String userId,
            @PathVariable String mealPlanId) {
        mealPlanService.deleteMealPlan(userId, mealPlanId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{mealPlanId}/mark-tried")
    public ResponseEntity<MealPlan> markRecipeAsTried(
            @RequestHeader("userId") String userId,
            @PathVariable String mealPlanId,
            @RequestParam String recipeId,
            @RequestParam(required = false) String feedback) {
        return ResponseEntity.ok(
            mealPlanService.markRecipeAsTried(userId, mealPlanId, recipeId, feedback)
        );
    }
}