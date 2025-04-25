package com.cookmate.backend.repository;


import com.cookmate.backend.model.RecipeUdara;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RecipeRepository extends MongoRepository<RecipeUdara, String> {
    List<RecipeUdara> findByTitleContainingIgnoreCase(String title);
    List<RecipeUdara> findByIngredientsContainingIgnoreCase(String ingredient);
}
