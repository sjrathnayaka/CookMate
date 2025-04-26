package com.cookmate.backend.dto.recipe;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRequestDto {
    private String title;
    private String description;
    private String cuisine;
    private int cookingTimeInMinutes;
    private String difficulty;
    private List<String> categories;
    private List<String> ingredients;
    private List<String> instructions;
    private List<String> mediaUrls;
    private String userId; // Pass the ID from frontend, don't embed whole User object
}