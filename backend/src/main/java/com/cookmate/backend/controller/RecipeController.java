package com.cookmate.backend.controller;

import com.cookmate.backend.model.RecipeUdara;
import com.cookmate.backend.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access if running React locally
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // === Create recipe with optional image ===
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<RecipeUdara> createRecipe(
            @RequestPart("recipe") RecipeUdara recipe,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            if (file != null && !file.isEmpty()) {
                String imageUrl = recipeService.uploadToCloudinary(file);
                recipe.setImageUrl(imageUrl);
            }
            RecipeUdara savedRecipe = recipeService.createRecipe(recipe);
            return ResponseEntity.ok(savedRecipe);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // === Get all recipes ===
    @GetMapping
    public List<RecipeUdara> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    // === Update recipe ===
    @PutMapping("/{id}")
    public RecipeUdara updateRecipe(@PathVariable String id, @RequestBody RecipeUdara recipe) {
        return recipeService.updateRecipe(id, recipe);
    }

    // === Delete recipe ===
    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable String id) {
        recipeService.deleteRecipe(id);
    }

    // === Search by title ===
    @GetMapping("/search/title")
    public List<RecipeUdara> searchByTitle(@RequestParam String q) {
        return recipeService.searchByTitle(q);
    }

    // === Search by ingredient ===
    @GetMapping("/search/ingredient")
    public List<RecipeUdara> searchByIngredient(@RequestParam String q) {
        return recipeService.searchByIngredient(q);
    }
}
