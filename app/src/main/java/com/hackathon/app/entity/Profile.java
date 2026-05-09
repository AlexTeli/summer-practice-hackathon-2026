package com.hackathon.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bio;

    private String profileImageUrl;

    private int skillLevel;

    @ManyToMany
    @JoinTable(
            name = "profile_sports",
            joinColumns = @JoinColumn(name = "profile_id"),
            inverseJoinColumns = @JoinColumn(name = "sport_id")
    )
    private List<Sport> sports;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}