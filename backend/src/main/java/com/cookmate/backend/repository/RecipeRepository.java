package com.cookmate.backend.repository;

import com.cookmate.backend.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.time.LocalDateTime;
import java.util.List;

public interface RecipeRepository extends MongoRepository<Recipe, String> {

    // Find recipes by user ID
    List<Recipe> findByUserId(String userId);
    
    // Find recipes by category (e.g., vegetarian, quick meals, etc.)
    List<Recipe> findByCategoriesContaining(String category);
    
    // Find recipes created within a specific date range
    List<Recipe> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Delete recipe by userId and recipeId
    void deleteByUserIdAndId(String userId, String id);
}
