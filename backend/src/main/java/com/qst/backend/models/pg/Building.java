package com.qst.backend.models.pg;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "building")
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String name;
    public String county;
    public String district;
    public String address;
    public String type;
    public String condition;
    public String area;
    public String owner;
    public String fact_owner;
    public String about;
    @OneToMany(mappedBy = "building")
    public Set<BuildingCustomAttribute> attributes;

}
