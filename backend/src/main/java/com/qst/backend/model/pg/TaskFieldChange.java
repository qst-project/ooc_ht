package com.qst.backend.model.pg;

import jakarta.persistence.*;

@Entity
@Table(name = "task_field_change")
public class TaskFieldChange {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(nullable = false)
    public String type;
    @Column(nullable = false)
    public String name;
    @Column(nullable = false)
    public String value;
    @ManyToOne
    @JoinColumn(name = "task_change_history_id")
    public TaskChangeHistory changeHistory;
}
