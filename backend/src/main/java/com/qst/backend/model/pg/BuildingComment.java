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

    @ManyToOne
    @JoinColumn(name = "building_comment_id")
    public User author;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    @JsonBackReference
    public BuildingComment reply;

    @ManyToOne
    @JoinColumn(name = "building_id")
    public Building building;
}
