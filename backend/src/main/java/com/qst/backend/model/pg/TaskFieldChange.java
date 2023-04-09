package com.qst.backend.model.pg;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "task_field_change")
public class TaskFieldChange {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String type;
    public String name;
    public String value;
    @ManyToOne
    @JoinColumn(name = "task_change_history_id")
    public TaskChangeHistory changeHistory;
}
