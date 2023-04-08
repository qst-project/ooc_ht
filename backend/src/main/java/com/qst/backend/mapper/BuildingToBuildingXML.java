package com.qst.backend.mapper;

import com.qst.backend.model.pg.Building;
import com.qst.backend.model.xml.BuildingXML;
import com.qst.backend.model.xml.CustomAttributeXML;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;


@Component
public class BuildingToBuildingXML implements Function<Building, BuildingXML> {

    final CustomAttributeToCustomAttributeXML customAttributeToCustomAttributeXML;

    public BuildingToBuildingXML(CustomAttributeToCustomAttributeXML customAttributeToCustomAttributeXML) {
        this.customAttributeToCustomAttributeXML = customAttributeToCustomAttributeXML;
    }


    @Override
    public BuildingXML apply(Building building) {
        List<CustomAttributeXML> customAttributeXMLS = building.attributes.stream().map(customAttributeToCustomAttributeXML).collect(Collectors.toList());
        return new BuildingXML(
                building.name,
                building.county,
                building.district,
                building.address,
                building.type,
                building.condition,
                building.area,
                building.owner,
                building.fact_owner,
                building.about,
                customAttributeXMLS
        );
    }
}
