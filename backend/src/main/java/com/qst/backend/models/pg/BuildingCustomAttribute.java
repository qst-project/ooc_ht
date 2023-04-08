package com.qst.backend.models.pg;

import jakarta.persistence.*;

@Entity
@Table(name = "building_custom_attribute")
public class BuildingCustomAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String groupName;
    public String name;
    public String value;
    public String meta;

    @ManyToOne
    @JoinColumn(name="building_id", nullable=false)
    private Building building;

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
