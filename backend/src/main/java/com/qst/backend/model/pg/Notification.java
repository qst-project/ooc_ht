package com.qst.backend.model.pg;

import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

@Entity
@Table(name = "building_comment")
public class Notification { // todo
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    @NotNull
    public String text;
//    public String mentions;
}
