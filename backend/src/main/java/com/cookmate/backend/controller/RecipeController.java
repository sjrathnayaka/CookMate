package com.cookmate.backend.controller;

import com.cookmate.backend.dto.recipe.RecipeRequestDto;
import com.cookmate.backend.dto.recipe.RecipeResponseDto;
import com.cookmate.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // Create a new recipe
    @PostMapping
    public ResponseEntity<RecipeResponseDto> createRecipe(
            @RequestBody RecipeRequestDto recipeRequestDto,
            @RequestParam String userId
    ) {
        RecipeResponseDto createdRecipe = recipeService.createRecipe(recipeRequestDto, userId);
        return new ResponseEntity<>(createdRecipe, HttpStatus.CREATED);
    }

    // Get all recipes with pagination
    @GetMapping
    public ResponseEntity<List<RecipeResponseDto>> getAllRecipes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        List<RecipeResponseDto> recipes = recipeService.getAllRecipes(page, size);
        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    // Get recipe by ID
    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> getRecipeById(@PathVariable String id) {
        RecipeResponseDto recipe = recipeService.getRecipeById(id);
        return new ResponseEntity<>(recipe, HttpStatus.OK);
    }

    // Update a recipe (with owner check)
    @PutMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> updateRecipe(
            @PathVariable String id,
            @RequestBody RecipeRequestDto recipeRequestDto,
            @RequestParam String userId
    ) {
        RecipeResponseDto updatedRecipe = recipeService.updateRecipe(id, recipeRequestDto, userId);
        return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
    }

    // Delete a recipe (with owner check)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(
            @PathVariable String id,
            @RequestParam String userId
    ) {
        recipeService.deleteRecipe(id, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
