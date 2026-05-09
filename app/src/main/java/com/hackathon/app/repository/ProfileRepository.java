package com.hackathon.app.repository;

import com.hackathon.app.entity.Profile;
import com.hackathon.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUser(User user);
}