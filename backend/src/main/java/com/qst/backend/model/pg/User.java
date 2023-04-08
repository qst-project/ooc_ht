package com.qst.backend.model.pg;

import jakarta.persistence.*;

@Entity
@Table(name = "ooc_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(nullable = false, unique = true)
    public String username;

    public String password;
}