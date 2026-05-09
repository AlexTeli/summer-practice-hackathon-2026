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

    public void createProfile(CreateProfileRequest req, String token) {

        String username = jwtService.extractUsername(token.replace("Bearer ", ""));

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        Profile profile = new Profile();
        profile.setUser(user);
        profile.setBio(req.bio);
        profile.setSkillLevel(req.skillLevel);

        List<Sport> sports = sportRepository.findAllById(req.sportIds);
        profile.setSports(sports);

        profileRepository.save(profile);
    }

    public Profile getMyProfile(String token) {

        String username = jwtService.extractUsername(token.replace("Bearer ", ""));

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        return profileRepository.findByUser(user)
                .orElse(null);
    }
}