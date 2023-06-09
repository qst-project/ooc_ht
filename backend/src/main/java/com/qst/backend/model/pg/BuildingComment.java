package com.qst.backend.model.pg;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Set;

@Entity
@Table(name = "building_comment")
//@ToString(exclude = {"building", "task"})
//@EqualsAndHashCode(exclude = {"building", "task"})
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
    public BuildingComment parent;

    @OneToMany(mappedBy="parent")
    public Set<BuildingComment> replies;

    @ManyToOne
    @JoinColumn(name = "building_id")
    public Building building;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "task_id", referencedColumnName = "id")
    public Task task;

}
