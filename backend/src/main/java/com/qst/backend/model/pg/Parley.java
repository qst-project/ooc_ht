package com.qst.backend.model.pg;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Set;

@Entity
@Table(name = "parley")
public class Parley {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
}
