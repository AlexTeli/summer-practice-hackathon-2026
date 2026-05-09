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
        // Verificăm dacă token-ul există și are formatul corect
        if (token == null || !token.startsWith("Bearer ") || token.length() < 15) {
            throw new RuntimeException("Token invalid sau expirat. Te rugăm să te loghezi din nou.");
        }

        String jwt = token.replace("Bearer ", "");

        // Verificare suplimentară pentru a evita MalformedJwtException (trebuie să aibă 2 puncte)
        if (jwt.chars().filter(ch -> ch == '.').count() != 2) {
            throw new RuntimeException("Formatul token-ului este incorect.");
        }

        String username = jwtService.extractUsername(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost găsit"));

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

        String username = jwtService.extractUsername(token.replace("Bearer ", ""));

        User user = userRepository.findByUsername(username)
                .orElseThrow();

        return profileRepository.findByUser(user)
                .orElse(null);
    }
}