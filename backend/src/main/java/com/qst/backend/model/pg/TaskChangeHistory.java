package com.qst.backend.model.pg;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "task_change_history")
public class TaskChangeHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date")
    public Date createdDate;

    @OneToMany(mappedBy = "changeHistory")
    public Set<TaskFieldChange> changes;

    @ManyToOne
    @JoinColumn(name = "task_change_history_id")
    public Task task;
}
