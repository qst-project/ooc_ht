package com.qst.backend.model.pg;

import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

import java.util.Set;

@Entity
@Table(name = "building_comment")
public class BuildingComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    @Lob
    public String text;

    @ManyToOne
    @JoinColumn(name = "building_comment_id")
    @NotNull
    public User author;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    public BuildingComment parent;
    @OneToMany
    @JoinColumn(referencedColumnName = "id")
    public Set<BuildingComment> replies;

    @ManyToOne
    @JoinColumn(name = "building_id")
    public Building building;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "task_id", referencedColumnName = "id")
    public Task task;

}
