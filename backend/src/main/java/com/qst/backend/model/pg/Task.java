package com.qst.backend.model.pg;

import jakarta.persistence.*;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
//    public String title;
//    public String text;
//    public String status;

//    public String mentions; //todo
}
