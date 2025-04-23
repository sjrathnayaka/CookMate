package com.cookmate.backend.repository;

import com.cookmate.backend.model.MealPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;  // Add this import
import java.util.List;

public interface MealPlanRepository extends MongoRepository<MealPlan, String> {
    List<MealPlan> findByUserId(String userId);
    List<MealPlan> findByUserIdAndStartDateBetween(String userId, LocalDate start, LocalDate end);
    void deleteByUserIdAndId(String userId, String id);
}