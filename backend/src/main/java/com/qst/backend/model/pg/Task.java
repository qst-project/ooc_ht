package com.qst.backend.model.pg;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Set;

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
