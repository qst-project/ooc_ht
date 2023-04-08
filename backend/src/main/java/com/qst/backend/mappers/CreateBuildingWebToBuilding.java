package com.qst.backend.mappers;

import com.qst.backend.models.pg.Building;
import com.qst.backend.models.web.CreateBuildingWeb;
import org.springframework.stereotype.Component;

import java.util.function.Function;


@Component
public class CreateBuildingWebToBuilding implements Function<CreateBuildingWeb, Building> {


    @Override
    public Building apply(CreateBuildingWeb createBuildingWeb) {
        Building building = new Building();
        building.name = createBuildingWeb.name;
        building.county = createBuildingWeb.county;
        building.district = createBuildingWeb.district;
        building.address = createBuildingWeb.address;
        building.type = createBuildingWeb.type;
        building.condition = createBuildingWeb.condition;
        building.area = createBuildingWeb.area;
        building.owner = createBuildingWeb.owner;
        building.fact_owner = createBuildingWeb.fact_owner;
        building.about = createBuildingWeb.about;
        return building;
    }
}
