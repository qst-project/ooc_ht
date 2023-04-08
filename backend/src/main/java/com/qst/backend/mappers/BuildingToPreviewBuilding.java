package com.qst.backend.mappers;

import com.qst.backend.models.web.PreviewBuildingWeb;
import com.qst.backend.models.pg.Building;
import org.springframework.stereotype.Component;

import java.util.function.Function;


@Component
public class BuildingToPreviewBuilding implements Function<Building, PreviewBuildingWeb> {

    @Override
    public PreviewBuildingWeb apply(Building building) {
        return new PreviewBuildingWeb(building.id, building.name);
    }
}
