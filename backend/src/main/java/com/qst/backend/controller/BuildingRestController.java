package com.qst.backend.controller;

import com.qst.backend.mapper.BuildingToFullBuildingWeb;
import com.qst.backend.mapper.BuildingToPreviewBuilding;
import com.qst.backend.mapper.CreateBuildingWebToBuilding;
import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.BuildingComment;
import com.qst.backend.model.pg.User;
import com.qst.backend.model.web.BuildingPreviewWeb;
import com.qst.backend.model.web.CreateBuildingCommentWeb;
import com.qst.backend.model.web.CreateBuildingWeb;
import com.qst.backend.model.web.FullBuildingWeb;
import com.qst.backend.repository.*;
import com.qst.backend.service.BuildingsArchiveService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class BuildingRestController {
    final BuildingRepository buildingRepository;
    final BuildingCommentRepository buildingCommentRepository;
    final UserRepository userRepository;
    final BuildingSaver buildingSaver;
    final BuildingToPreviewBuilding buildingToPreviewBuilding;
    final BuildingCustomAttributeRepository buildingCustomAttributeRepository;
    final CreateBuildingWebToBuilding createBuildingWebToBuilding;
    final BuildingToFullBuildingWeb buildingToFullBuildingWeb;
    final BuildingsArchiveService buildingsArchiveService;

    public BuildingRestController(BuildingRepository buildingRepository, BuildingCommentRepository buildingCommentRepository, UserRepository userRepository, BuildingSaver buildingSaver, BuildingToPreviewBuilding buildingToPreviewBuilding, BuildingCustomAttributeRepository buildingCustomAttributeRepository, CreateBuildingWebToBuilding createBuildingWebToBuilding, BuildingToFullBuildingWeb buildingToFullBuildingWeb, BuildingsArchiveService buildingsArchiveService) {
        this.buildingRepository = buildingRepository;
        this.buildingCommentRepository = buildingCommentRepository;
        this.userRepository = userRepository;
        this.buildingSaver = buildingSaver;
        this.buildingToPreviewBuilding = buildingToPreviewBuilding;
        this.buildingCustomAttributeRepository = buildingCustomAttributeRepository;
        this.createBuildingWebToBuilding = createBuildingWebToBuilding;
        this.buildingToFullBuildingWeb = buildingToFullBuildingWeb;
        this.buildingsArchiveService = buildingsArchiveService;
    }

    @GetMapping("/buildings")
    public Page<BuildingPreviewWeb> buildings(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "30") int size) {
        Pageable paging = PageRequest.of(page, size);
        return buildingRepository.findAll(paging).map(buildingToPreviewBuilding);
    }

    @PostMapping("/building")
    public Long createBuilding(@RequestBody CreateBuildingWeb createBuildingRequest) {
        Building building = new CreateBuildingWebToBuilding().apply(createBuildingRequest);
        buildingSaver.saveWithProperties(building, createBuildingRequest.getCustomAttributes());
        return building.id;
    }

    @GetMapping("/building/{buildingId}")
    public FullBuildingWeb getBuilding(@PathVariable @NotNull Long buildingId) {
        Building building = buildingRepository.findById(buildingId).orElseThrow();
        return buildingToFullBuildingWeb.apply(building);
    }

    @PatchMapping("/building/{buildingId}")
    public FullBuildingWeb patchBuilding(@PathVariable @NotNull Long buildingId, @RequestBody CreateBuildingWeb patchRequest) {
        Building building = buildingRepository.findById(buildingId).orElseThrow();
        building.name = patchRequest.name != null ? patchRequest.name : building.name;
        building.county = patchRequest.county != null ? patchRequest.county : building.county;
        building.district = patchRequest.district != null ? patchRequest.district : building.district;
        building.address = patchRequest.address != null ? patchRequest.address : building.address;
        building.type = patchRequest.type != null ? patchRequest.type : building.type;
        building.condition = patchRequest.condition != null ? patchRequest.condition : building.condition;
        building.area = patchRequest.area != null ? patchRequest.area : building.area;
        building.owner = patchRequest.owner != null ? patchRequest.owner : building.owner;
        building.fact_owner = patchRequest.fact_owner != null ? patchRequest.fact_owner : building.fact_owner;
        building.about = patchRequest.about != null ? patchRequest.about : building.about;
        if (patchRequest.getCustomAttributes() != null) {
            buildingCustomAttributeRepository.deleteAll(building.attributes);
            buildingSaver.saveWithProperties(building, patchRequest.getCustomAttributes());
        } else {
            buildingRepository.save(building);
        }
        return buildingToFullBuildingWeb.apply(building);
    }

    @GetMapping("/buildings/{buildingIds}/export")
    public void exportBuildings(@PathVariable @NotNull String buildingIds, HttpServletResponse response) throws IOException {
        List<Long> ids = Arrays.stream(buildingIds.split(",")).map(Long::parseLong).collect(Collectors.toList());
        byte[] bytes = buildingsArchiveService.createArchiveFromBuildings(ids);
        IOUtils.copy(new ByteArrayInputStream(bytes), response.getOutputStream());
        response.flushBuffer();
    }

    @PostMapping("/buildings/import")
    public List<BuildingPreviewWeb> importBuildings(@RequestParam("file") @NotNull MultipartFile file) throws IOException {
        return buildingsArchiveService.createBuildingsFromArchive(file.getInputStream()).stream()
                .map(buildingToPreviewBuilding)
                .collect(Collectors.toList());
    }

    @PostMapping("/building/{buildingId}/comment")
    public Long importBuildings(@PathVariable @NotNull Long buildingId, @RequestBody CreateBuildingCommentWeb createBuildingCommentWeb) throws IOException {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Building building = buildingRepository.findById(buildingId).orElseThrow();
        User user = userRepository.findByUsername(username);
        BuildingComment buildingComment = new BuildingComment();
        buildingComment.text = createBuildingCommentWeb.text;
        buildingComment.author = user;
        buildingComment.building = building;
        if (createBuildingCommentWeb.replyTo != null) {
            buildingComment.reply = buildingCommentRepository.findById(createBuildingCommentWeb.replyTo).orElseThrow();
        }
        buildingCommentRepository.save(buildingComment);
        return buildingComment.id;
    }
}
