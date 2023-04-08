package com.qst.backend.model.pg;

import jakarta.persistence.*;

@Entity
@Table(name = "building_comment")
public class BuildingComment { // todo
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String text;
//    public String mentions;
}
