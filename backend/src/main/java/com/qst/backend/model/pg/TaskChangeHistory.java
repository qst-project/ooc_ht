package com.qst.backend.model.pg;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "task_change_history")
public class TaskChangeHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date")
    private Date createdDate;


}
