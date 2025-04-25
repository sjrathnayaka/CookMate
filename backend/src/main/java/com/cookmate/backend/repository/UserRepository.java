package com.cookmate.backend.repository;

import com.cookmate.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // Find a user by email
    Optional<User> findByEmail(String email);

    // Check if a user with a given email exists
    boolean existsByEmail(String email);

    // Optional: Find by username (for login or profile)
    Optional<User> findByUsername(String username);

    // Optional: Get all users by authProvider
    List<User> findByAuthProvider(String authProvider);

    // Optional: Search users by cookingPreferences containing a value
    List<User> findByCookingPreferencesContaining(String preference);
}
