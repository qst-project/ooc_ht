package com.qst.backend.models.pg;

import jakarta.persistence.*;

@Entity
@Table(name = "building_comment")
public class Notification { // todo
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String text;
//    public String mentions;
}
