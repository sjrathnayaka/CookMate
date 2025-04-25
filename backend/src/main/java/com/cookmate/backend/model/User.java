package com.cookmate.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String email;
    private String password;
    private String role = "USER";

    private String username;
    private String fullName;
    private String bio;
    private String profilePictureUrl;

    private String authProvider; // e.g., GOOGLE, FACEBOOK, EMAIL

    private List<String> cookingPreferences;

    // Store only the IDs for relationships
    private List<String> recipeIds;
    private List<String> followingUserIds;
    private List<String> followerUserIds;

    private String createdAt;

    public User() {
    }

    public User(String email, String password, String username, String fullName, String bio,
                String profilePictureUrl, String authProvider, List<String> cookingPreferences, String createdAt) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.fullName = fullName;
        this.bio = bio;
        this.profilePictureUrl = profilePictureUrl;
        this.authProvider = authProvider;
        this.cookingPreferences = cookingPreferences;
        this.createdAt = createdAt;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(String authProvider) {
        this.authProvider = authProvider;
    }

    public List<String> getCookingPreferences() {
        return cookingPreferences;
    }

    public void setCookingPreferences(List<String> cookingPreferences) {
        this.cookingPreferences = cookingPreferences;
    }

    public List<String> getRecipeIds() {
        return recipeIds;
    }

    public void setRecipeIds(List<String> recipeIds) {
        this.recipeIds = recipeIds;
    }

    public List<String> getFollowingUserIds() {
        return followingUserIds;
    }

    public void setFollowingUserIds(List<String> followingUserIds) {
        this.followingUserIds = followingUserIds;
    }

    public List<String> getFollowerUserIds() {
        return followerUserIds;
    }

    public void setFollowerUserIds(List<String> followerUserIds) {
        this.followerUserIds = followerUserIds;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
