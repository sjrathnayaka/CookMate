package com.cookmate.backend.controller;

import com.cookmate.backend.model.User;
import com.cookmate.backend.repository.UserRepository;
import com.cookmate.backend.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7); // Remove "Bearer "
        String email = jwtUtil.getEmailFromToken(token);
        Optional<User> user = userRepo.findByEmail(email);

        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String authHeader,
                                           @RequestBody User updatedUser) {
        String token = authHeader.substring(7);
        String email = jwtUtil.getEmailFromToken(token);

        Optional<User> userOpt = userRepo.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = userOpt.get();

        user.setUsername(updatedUser.getUsername());
        user.setFullName(updatedUser.getFullName());
        user.setBio(updatedUser.getBio());
        user.setCookingPreferences(updatedUser.getCookingPreferences());
        user.setProfilePictureUrl(updatedUser.getProfilePictureUrl()); // optional for now

        userRepo.save(user);
        return ResponseEntity.ok(user);
    }
}
