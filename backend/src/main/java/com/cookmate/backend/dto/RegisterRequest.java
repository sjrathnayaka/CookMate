package com.cookmate.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class RegisterRequest {
    private String email;
    private String password; // optional for social login
    private String username;
    private String fullName;
    private String bio;
    private String profilePictureUrl;
    private String authProvider; // GOOGLE, FACEBOOK, EMAIL
    private List<String> cookingPreferences;
}
