package com.qst.backend.model.pg;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Set;

@Entity
@Table(name = "building")
@ToString(exclude = {"comments", "attributes"})
@EqualsAndHashCode(exclude = {"comments", "attributes"})
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

    @OneToMany(mappedBy = "building")
    public Set<BuildingComment> comments;

}
