package com.qst.backend.models.pg;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "building_comment")
public class BuildingComment { // todo
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String text;
//    public String mentions;
}
