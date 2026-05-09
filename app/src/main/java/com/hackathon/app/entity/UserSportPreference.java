package com.hackathon.app.entity;

import jakarta.persistence.*;

@Entity
public class UserSportPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Sport sport;

    private int skillLevelPreference;
}