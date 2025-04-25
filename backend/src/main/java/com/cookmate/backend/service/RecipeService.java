package com.cookmate.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.cookmate.backend.model.RecipeUdara;
import com.cookmate.backend.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final Cloudinary cloudinary;

    public RecipeService(RecipeRepository recipeRepository, Cloudinary cloudinary) {
        this.recipeRepository = recipeRepository;
        this.cloudinary = cloudinary;
    }

    // === Upload to Cloudinary ===
    public String uploadToCloudinary(MultipartFile file) {
        try {
            @SuppressWarnings("unchecked")
Map<String, Object> uploadResult = (Map<String, Object>) cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

             System.out.println("Cloudinary Upload Result: " + uploadResult);
            return (String) uploadResult.get("secure_url"); // safer than "url"
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Cloudinary upload failed", e); // Don't return null
        }
    }
    
    

    // === CRUD Operations ===

    public RecipeUdara createRecipe(RecipeUdara recipe) {
        return recipeRepository.save(recipe);
    }

    public List<RecipeUdara> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public RecipeUdara updateRecipe(String id, RecipeUdara recipe) {
        recipe.setId(id);
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(String id) {
        recipeRepository.deleteById(id);
    }

    // === Search Operations ===

    public List<RecipeUdara> searchByTitle(String title) {
        return recipeRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<RecipeUdara> searchByIngredient(String ingredient) {
        return recipeRepository.findByIngredientsContainingIgnoreCase(ingredient);
    }
}
