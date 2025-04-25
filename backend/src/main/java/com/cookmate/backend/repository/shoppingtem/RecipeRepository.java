package com.cookmate.backend.repository.shoppingtem;

import com.cookmate.backend.model.Shoppingtemp.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
}
