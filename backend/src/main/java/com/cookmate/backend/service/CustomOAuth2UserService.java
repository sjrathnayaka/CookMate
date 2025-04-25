package com.cookmate.backend.service;

import com.cookmate.backend.model.User;
import com.cookmate.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) {
        OAuth2User oAuth2User = super.loadUser(request);
        String email = oAuth2User.getAttribute("email");

        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isEmpty()) {
            // Create new user from Google data
            User user = new User();
            user.setEmail(email);
            user.setUsername(email.split("@")[0]);
            user.setAuthProvider("GOOGLE");
            userRepository.save(user);
        }

        return oAuth2User;
    }
}