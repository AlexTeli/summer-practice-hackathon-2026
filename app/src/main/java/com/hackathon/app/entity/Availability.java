package com.hackathon.app.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private TimeSlot timeSlot;

    private boolean available;
}