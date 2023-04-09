package com.qst.backend.model.pg;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "parley")
public class Parley {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date")
    public Date createdDate;

    @OneToMany(mappedBy = "parley")
    public Set<TaskChangeHistory> changes;
}
