package com.hackathon.app.service;

import com.hackathon.app.dto.CreateProfileRequest;
import com.hackathon.app.entity.Profile;
import com.hackathon.app.entity.Sport;
import com.hackathon.app.entity.User;
import com.hackathon.app.repository.ProfileRepository;
import com.hackathon.app.repository.SportRepository;
import com.hackathon.app.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final SportRepository sportRepository;
    private final JwtService jwtService;

    public ProfileService(ProfileRepository profileRepository,
                          UserRepository userRepository,
                          SportRepository sportRepository,
                          JwtService jwtService) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.sportRepository = sportRepository;
        this.jwtService = jwtService;
    }

    private String validateAndExtractToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Token lipsă");
        }
        String jwt = token.replace("Bearer ", "");
        if (jwt.chars().filter(ch -> ch == '.').count() != 2) {
            throw new RuntimeException("Token invalid");
        }
        return jwt;
    }

    public void createProfile(CreateProfileRequest req, String token) {
        String jwt = validateAndExtractToken(token);
        String username = jwtService.extractUsername(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user).orElse(new Profile());

        profile.setUser(user);
        profile.setBio(req.getBio());
        profile.setSkillLevel(req.getSkillLevel());

        if (req.getSportIds() != null && !req.getSportIds().isEmpty()) {
            List<Sport> sports = sportRepository.findAllById(req.getSportIds());
            profile.setSports(sports);
        }

        profileRepository.save(profile);
    }

    public Profile getMyProfile(String token) {
        try {
            String jwt = validateAndExtractToken(token);
            String username = jwtService.extractUsername(jwt);
            User user = userRepository.findByUsername(username).orElseThrow();
            return profileRepository.findByUser(user).orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }
}