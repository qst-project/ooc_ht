package com.qst.backend.model.pg;

import jakarta.persistence.*;

@Entity
@Table(name = "attachment")
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String name;
}
