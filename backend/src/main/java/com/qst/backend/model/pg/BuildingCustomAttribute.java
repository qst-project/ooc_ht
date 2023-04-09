package com.qst.backend.model.pg;

import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

@Entity
@Table(name = "building_custom_attribute")
public class BuildingCustomAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    @NotNull
    public String groupName;
    @NotNull
    public String name;
    @NotNull
    public String value;
    public String meta;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    public Building building;

    public static BuildingCustomAttribute create(Building building, String groupName, String name, String value, String meta) {
        BuildingCustomAttribute buildingCustomAttribute = new BuildingCustomAttribute();
        buildingCustomAttribute.building = building;
        buildingCustomAttribute.groupName = groupName;
        buildingCustomAttribute.name = name;
        buildingCustomAttribute.value = value;
        buildingCustomAttribute.meta = meta;
        return buildingCustomAttribute;
    }

}
