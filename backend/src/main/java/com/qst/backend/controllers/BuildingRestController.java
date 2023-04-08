package com.qst.backend.controllers;

import com.qst.backend.mappers.BuildingToFullBuildingWeb;
import com.qst.backend.mappers.BuildingToPreviewBuilding;
import com.qst.backend.mappers.CreateBuildingWebToBuilding;
import com.qst.backend.models.pg.Building;
import com.qst.backend.models.pg.BuildingCustomAttribute;
import com.qst.backend.models.web.CreateBuildingWeb;
import com.qst.backend.models.web.CreateCustomAttributeWeb;
import com.qst.backend.models.web.FullBuildingWeb;
import com.qst.backend.models.web.PreviewBuildingWeb;
import com.qst.backend.repository.BuildingCustomAttributeRepository;
import com.qst.backend.repository.BuildingRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class BuildingRestController {
    final BuildingRepository buildingRepository;
    final BuildingToPreviewBuilding buildingToPreviewBuilding;
    final BuildingCustomAttributeRepository buildingCustomAttributeRepository;
    final CreateBuildingWebToBuilding createBuildingWebToBuilding;
    final BuildingToFullBuildingWeb buildingToFullBuildingWeb;

    public BuildingRestController(BuildingRepository buildingRepository, BuildingToPreviewBuilding buildingToPreviewBuilding, BuildingCustomAttributeRepository buildingCustomAttributeRepository, CreateBuildingWebToBuilding createBuildingWebToBuilding, BuildingToFullBuildingWeb buildingToFullBuildingWeb) {
        this.buildingRepository = buildingRepository;
        this.buildingToPreviewBuilding = buildingToPreviewBuilding;
        this.buildingCustomAttributeRepository = buildingCustomAttributeRepository;
        this.createBuildingWebToBuilding = createBuildingWebToBuilding;
        this.buildingToFullBuildingWeb = buildingToFullBuildingWeb;
    }

    @GetMapping("/buildings")
    public Page<PreviewBuildingWeb> buildings(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "30") int size) {
        Pageable paging = PageRequest.of(page, size);
        return buildingRepository.findAll(paging).map(buildingToPreviewBuilding);
    }

    @PostMapping("/building")
    public Long createBuilding(@RequestBody CreateBuildingWeb createBuildingRequest) {
        Building building = new CreateBuildingWebToBuilding().apply(createBuildingRequest);
        buildingRepository.save(building);
        for (Map.Entry<String, Map<String, CreateCustomAttributeWeb>> group : createBuildingRequest.getCustomAttributes().entrySet()) {
            String groupName = group.getKey();
            for (Map.Entry<String, CreateCustomAttributeWeb> attribute : group.getValue().entrySet()) {
                String name = attribute.getKey();
                String value = attribute.getValue().getValue();
                String meta = attribute.getValue().getMeta();
                BuildingCustomAttribute buildingCustomAttribute = BuildingCustomAttribute.create(building, groupName, name, value, meta);
                buildingCustomAttributeRepository.save(buildingCustomAttribute);
            }
        }
        return building.id;
    }

    @GetMapping("/building/{buildingId}")
    public FullBuildingWeb getBuilding(@PathVariable @NotNull Long buildingId) {
        Building building = buildingRepository.findById(buildingId).orElseThrow();
        return buildingToFullBuildingWeb.apply(building);
    }
}
