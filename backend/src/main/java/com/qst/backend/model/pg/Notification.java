package com.qst.backend.model.pg;

import jakarta.persistence.*;

@Entity
@Table(name = "building_comment")
public class Notification { // todo
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(nullable = false)
    public String text;
}
