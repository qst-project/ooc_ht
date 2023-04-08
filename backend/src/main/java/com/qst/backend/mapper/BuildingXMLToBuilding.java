package com.qst.backend.mapper;

import com.qst.backend.model.pg.Building;
import com.qst.backend.model.xml.BuildingXML;
import org.springframework.stereotype.Component;

import java.util.function.Function;


@Component
public class BuildingXMLToBuilding implements Function<BuildingXML, Building> {

    @Override
    public Building apply(BuildingXML buildingXML) {
        Building building = new Building();
        building.name = buildingXML.name;
        building.county = buildingXML.county;
        building.district = buildingXML.district;
        building.address = buildingXML.address;
        building.type = buildingXML.type;
        building.condition = buildingXML.condition;
        building.area = buildingXML.area;
        building.owner = buildingXML.owner;
        building.fact_owner = buildingXML.fact_owner;
        building.about = buildingXML.about;
        return building;
    }
}
