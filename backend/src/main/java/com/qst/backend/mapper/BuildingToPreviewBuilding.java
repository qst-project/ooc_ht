package com.qst.backend.mapper;

import com.qst.backend.model.pg.Building;
import com.qst.backend.model.web.BuildingPreviewWeb;
import org.springframework.stereotype.Component;

import java.util.function.Function;


@Component
public class BuildingToPreviewBuilding implements Function<Building, BuildingPreviewWeb> {

    @Override
    public BuildingPreviewWeb apply(Building building) {
        return new BuildingPreviewWeb(
                building.id,
                building.name,
                building.type,
                building.address,
                building.district,
                building.county,
                building.status
        );
    }
}
