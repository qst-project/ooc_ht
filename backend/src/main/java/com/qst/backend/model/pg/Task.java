package com.qst.backend.model.pg;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @OneToOne(mappedBy = "task")
    public BuildingComment comment;

    @OneToMany(mappedBy = "task")
    public Set<TaskChangeHistory> changes;
}
