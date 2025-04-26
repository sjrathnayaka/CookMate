package com.cookmate.backend.dto.recipe;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeResponseDto {

    private String id;
    private String title;
    private String description;
    private String cuisine;
    private int cookingTimeInMinutes;
    private String difficulty;
    private List<String> categories;
    private List<String> ingredients;
    private List<String> instructions;
    private List<String> mediaUrls;

    private boolean reported;
    private LocalDateTime createdAt;

    private String userId;
    private String username;

    private int likesCount;
    private int commentsCount;
    private boolean isLikedByCurrentUser;

    // Custom constructor that matches your usage
    public RecipeResponseDto(String id, String title, String description, String cuisine, int cookingTimeInMinutes,
                             String difficulty, List<String> categories, List<String> ingredients,
                             List<String> instructions, List<String> mediaUrls, boolean reported,
                             LocalDateTime createdAt, String userId, String username) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.cuisine = cuisine;
        this.cookingTimeInMinutes = cookingTimeInMinutes;
        this.difficulty = difficulty;
        this.categories = categories;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.mediaUrls = mediaUrls;
        this.reported = reported;
        this.createdAt = createdAt;
        this.userId = userId;
        this.username = username;
        this.likesCount = 0;
        this.commentsCount = 0;
        this.isLikedByCurrentUser = false;
    }
}