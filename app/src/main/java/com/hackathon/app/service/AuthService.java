package com.hackathon.app.service;

import com.hackathon.app.entity.User;
import com.hackathon.app.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final com.hackathon.app.service.JwtService jwtService;

    public AuthService(UserRepository repo, PasswordEncoder encoder, com.hackathon.app.service.JwtService jwtService) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public String register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return "User registered";
    }

    public String login(User user) {
        User dbUser = repo.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Wrong password");
        }

        return jwtService.generateToken(dbUser.getUsername());
    }
}