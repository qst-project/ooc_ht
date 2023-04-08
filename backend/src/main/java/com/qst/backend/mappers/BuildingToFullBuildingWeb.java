package com.qst.backend.mappers;

import com.qst.backend.models.pg.Building;
import com.qst.backend.models.web.CreateCustomAttributeWeb;
import com.qst.backend.models.web.FullBuildingWeb;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;


@Component
public class BuildingToFullBuildingWeb implements Function<Building, FullBuildingWeb> {


    @Override
    public FullBuildingWeb apply(Building building) {
        Map<String, Map<String, List<CreateCustomAttributeWeb>>> attributes = building.attributes.stream()
                .collect(
                        Collectors.groupingBy(e -> e.groupName,
                                Collectors.groupingBy(e -> e.name,
                                        Collectors.mapping(e -> new CreateCustomAttributeWeb(e.value, e.meta),
                                                Collectors.toList()))));
        return new FullBuildingWeb(
                building.id,
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
                attributes
        );
    }
}
