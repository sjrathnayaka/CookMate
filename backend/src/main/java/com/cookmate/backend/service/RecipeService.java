package com.cookmate.backend.service;

import com.cookmate.backend.dto.recipe.RecipeRequestDto;
import com.cookmate.backend.dto.recipe.RecipeResponseDto;
import com.cookmate.backend.model.Recipe;
import com.cookmate.backend.model.User;
import com.cookmate.backend.repository.RecipeRepository;
import com.cookmate.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, UserRepository userRepository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    // Create a new recipe
    public RecipeResponseDto createRecipe(RecipeRequestDto recipeRequestDto, String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();

        Recipe recipe = new Recipe();
        recipe.setTitle(recipeRequestDto.getTitle());
        recipe.setDescription(recipeRequestDto.getDescription());
        recipe.setCuisine(recipeRequestDto.getCuisine());
        recipe.setCookingTimeInMinutes(recipeRequestDto.getCookingTimeInMinutes());
        recipe.setDifficulty(recipeRequestDto.getDifficulty());
        recipe.setCategories(recipeRequestDto.getCategories());
        recipe.setIngredients(recipeRequestDto.getIngredients());
        recipe.setInstructions(recipeRequestDto.getInstructions());
        recipe.setMediaUrls(recipeRequestDto.getMediaUrls());
        recipe.setCreatedAt(LocalDateTime.now());
        recipe.setUser(user);
        recipe.setReported(false);

        Recipe savedRecipe = recipeRepository.save(recipe);

        return mapToRecipeResponseDto(savedRecipe);
    }

    // Get all recipes with pagination
    public List<RecipeResponseDto> getAllRecipes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Recipe> recipes = recipeRepository.findAll(pageable).getContent();
        return recipes.stream()
                .map(this::mapToRecipeResponseDto)
                .collect(Collectors.toList());
    }

    // Get recipe by ID
    public RecipeResponseDto getRecipeById(String recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
        return mapToRecipeResponseDto(recipe);
    }

    // Update a recipe (with owner check)
public RecipeResponseDto updateRecipe(String recipeId, RecipeRequestDto recipeRequestDto, String userId) {
    Recipe recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new RuntimeException("Recipe not found"));

    // Authorization check: Make sure the user is the owner
    if (!recipe.getUser().getId().equals(userId)) {
        throw new RuntimeException("Unauthorized: You can only update your own recipes.");
    }

    // Don't update the createdAt field
    recipe.setTitle(recipeRequestDto.getTitle());
    recipe.setDescription(recipeRequestDto.getDescription());
    recipe.setCuisine(recipeRequestDto.getCuisine());
    recipe.setCookingTimeInMinutes(recipeRequestDto.getCookingTimeInMinutes());
    recipe.setDifficulty(recipeRequestDto.getDifficulty());
    recipe.setCategories(recipeRequestDto.getCategories());
    recipe.setIngredients(recipeRequestDto.getIngredients());
    recipe.setInstructions(recipeRequestDto.getInstructions());
    recipe.setMediaUrls(recipeRequestDto.getMediaUrls());

    Recipe updatedRecipe = recipeRepository.save(recipe);

    return mapToRecipeResponseDto(updatedRecipe);
    }

    // Delete a recipe (with owner check)
    public void deleteRecipe(String recipeId, String userId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        // Authorization check: Make sure the user is the owner
        if (!recipe.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: You can only delete your own recipes.");
        }

        recipeRepository.delete(recipe);
    }

    // Helper method to map Recipe to RecipeResponseDto
    private RecipeResponseDto mapToRecipeResponseDto(Recipe recipe) {
        return new RecipeResponseDto(
                recipe.getId(),
                recipe.getTitle(),
                recipe.getDescription(),
                recipe.getCuisine(),
                recipe.getCookingTimeInMinutes(),
                recipe.getDifficulty(),
                recipe.getCategories(),
                recipe.getIngredients(),
                recipe.getInstructions(),
                recipe.getMediaUrls(),
                recipe.isReported(),
                recipe.getCreatedAt(),
                recipe.getUser().getId(), // assuming userId as String
                recipe.getUser().getUsername() // assuming username field in User model
        );
    }
}
