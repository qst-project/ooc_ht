package com.qst.backend.model.pg;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "ooc_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(nullable = false, unique = true)
    public String username;

    public String password;
    public String fullName;

    @OneToMany(mappedBy="author")
    private Set<BuildingComment> comments;
}