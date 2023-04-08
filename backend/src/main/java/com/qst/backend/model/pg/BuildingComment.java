package com.qst.backend.model.pg;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "building_comment")
public class BuildingComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String text;
    public String author;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    @JsonBackReference
    public BuildingComment reply;


//    public String mentions; //todo
}
