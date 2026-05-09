package com.hackathon.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sports") // Specificăm numele corect al tabelului din baza de date
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "min_players") // Va crea coloana "min_players" în baza de date
    private int minPlayers;

    @Column(name = "max_players") // Va crea coloana "max_players" în baza de date
    private int maxPlayers;
}