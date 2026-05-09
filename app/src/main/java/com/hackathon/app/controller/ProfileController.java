package com.hackathon.app.controller;

import com.hackathon.app.dto.CreateProfileRequest;
import com.hackathon.app.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hackathon.app.entity.Profile;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProfile(
            @RequestBody CreateProfileRequest request,
            @RequestHeader("Authorization") String token
    ) {
        profileService.createProfile(request, token);
        return ResponseEntity.ok("Profile created");
    }

    @GetMapping("/me")
    public Profile getMyProfile(
            @RequestHeader("Authorization") String token
    ) {
        return profileService.getMyProfile(token);
    }
}