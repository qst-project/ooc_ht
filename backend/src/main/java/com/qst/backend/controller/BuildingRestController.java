package com.qst.backend.controller;

import com.qst.backend.mapper.*;
import com.qst.backend.model.pg.*;
import com.qst.backend.model.web.*;
import com.qst.backend.repository.*;
import com.qst.backend.service.BuildingsArchiveService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
public class BuildingRestController {
    final ParleyRepository parleyRepository;
    final TaskToTaskWeb taskToTaskWeb;
    final TaskChangeHistoryRepository taskChangeHistoryRepository;
    final TaskRepository taskRepository;
    final CreateTaskWebToSetOfChanges createTaskWebToSetOfChanges;
    final TaskFieldChangeRepository taskFieldChangeRepository;
    final BuildingCommentToBuildingCommentWeb buildingCommentToBuildingCommentWeb;
    final BuildingRepository buildingRepository;
    final BuildingCommentRepository buildingCommentRepository;
    final UserRepository userRepository;
    final BuildingSaver buildingSaver;
    final BuildingToPreviewBuilding buildingToPreviewBuilding;
    final BuildingCustomAttributeRepository buildingCustomAttributeRepository;
    final CreateBuildingWebToBuilding createBuildingWebToBuilding;
    final BuildingToFullBuildingWeb buildingToFullBuildingWeb;
    final BuildingsArchiveService buildingsArchiveService;

    public BuildingRestController(ParleyRepository parleyRepository, TaskToTaskWeb taskToTaskWeb, TaskChangeHistoryRepository taskChangeHistoryRepository, TaskRepository taskRepository, CreateTaskWebToSetOfChanges createTaskWebToSetOfChanges, TaskFieldChangeRepository taskFieldChangeRepository, BuildingCommentToBuildingCommentWeb buildingCommentToBuildingCommentWeb, BuildingRepository buildingRepository, BuildingCommentRepository buildingCommentRepository, UserRepository userRepository, BuildingSaver buildingSaver, BuildingToPreviewBuilding buildingToPreviewBuilding, BuildingCustomAttributeRepository buildingCustomAttributeRepository, CreateBuildingWebToBuilding createBuildingWebToBuilding, BuildingToFullBuildingWeb buildingToFullBuildingWeb, BuildingsArchiveService buildingsArchiveService) {
        this.parleyRepository = parleyRepository;
        this.taskToTaskWeb = taskToTaskWeb;
        this.taskChangeHistoryRepository = taskChangeHistoryRepository;
        this.taskRepository = taskRepository;
        this.createTaskWebToSetOfChanges = createTaskWebToSetOfChanges;
        this.taskFieldChangeRepository = taskFieldChangeRepository;
        this.buildingCommentToBuildingCommentWeb = buildingCommentToBuildingCommentWeb;
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
        building.status = patchRequest.status != null ? patchRequest.status : building.status;
        building.description = patchRequest.description != null ? patchRequest.description : building.description;
        buildingRepository.save(building);
        if (patchRequest.getCustomAttributes() != null) {
            buildingCustomAttributeRepository.deleteAll(building.attributes);
            buildingSaver.saveWithProperties(building, patchRequest.getCustomAttributes());
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
    public Long createComment(@PathVariable @NotNull Long buildingId, @RequestBody CreateBuildingCommentWeb createBuildingCommentWeb) throws IOException {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Building building = buildingRepository.findById(buildingId).orElseThrow();
        User user = userRepository.findByUsername(username);
        BuildingComment buildingComment = new BuildingComment();
        buildingComment.text = createBuildingCommentWeb.text;
        buildingComment.author = user;
        buildingComment.building = building;
        if (createBuildingCommentWeb.replyTo != null) {
            buildingComment.parent = buildingCommentRepository.findById(createBuildingCommentWeb.replyTo).orElseThrow();
        }
        buildingCommentRepository.save(buildingComment);
        return buildingComment.id;
    }

    @GetMapping("/building/{buildingId}/comments")
    public List<BuildingCommentWeb> getComments(@PathVariable @NotNull Long buildingId) {
        Building building = buildingRepository.findById(buildingId).orElseThrow();
        return building.comments.stream()
                .filter(e -> e.parent == null)
                .map(buildingCommentToBuildingCommentWeb)
                .collect(Collectors.toList());
    }

    @PostMapping("/building/{buildingId}/task")
    public Long createTask(@PathVariable @NotNull Long buildingId, @RequestBody CreateTaskWeb createTaskWeb) {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user = userRepository.findByUsername(username);

        Building building = buildingRepository.findById(buildingId).orElseThrow();
        // create comment
        BuildingComment buildingComment = new BuildingComment();
        buildingComment.building = building;
        if (createTaskWeb.replyTo != null) {
            buildingComment.parent = buildingCommentRepository.findById(createTaskWeb.replyTo).orElseThrow();
        }
        buildingComment.text = "См. задачу " + (createTaskWeb.title != null ? createTaskWeb.title : "");
        buildingComment.author = user;
        buildingCommentRepository.save(buildingComment);

        // create task
        Task task = new Task();
        task.comment = buildingComment;
        taskRepository.save(task);

        buildingComment.task = task;
        taskRepository.save(task);

        // create task change history
        TaskChangeHistory taskChangeHistory = new TaskChangeHistory();
        taskChangeHistory.task = task;
        taskChangeHistoryRepository.save(taskChangeHistory);

        // create task change fields
        List<TaskFieldChange> changes = createTaskWebToSetOfChanges.apply(createTaskWeb).stream()
                .peek(e -> e.changeHistory = taskChangeHistory)
                .peek(e -> e.type = "POST")
                .collect(Collectors.toList());
        taskFieldChangeRepository.saveAll(changes);
        return buildingComment.id;
    }

    @GetMapping("/building/{buildingId}/comment/{commentId}/task")
    public TaskWeb getTask(@PathVariable @NotNull Long buildingId, @PathVariable @NotNull Long commentId) {
        BuildingComment buildingComment = buildingCommentRepository.findById(commentId).orElseThrow();
        return taskToTaskWeb.apply(buildingComment.task);
    }

    @PatchMapping("/building/{buildingId}/comment/{commentId}/task")
    public TaskWeb patchTask(@PathVariable @NotNull Long buildingId, @PathVariable @NotNull Long commentId, @RequestBody CreateTaskWeb createTaskWeb) {
        BuildingComment buildingComment = buildingCommentRepository.findById(commentId).orElseThrow();

        Task task = buildingComment.task;

        TaskChangeHistory taskChangeHistory = new TaskChangeHistory();
        taskChangeHistory.task = task;
        if (createTaskWeb.parley != null) {
            taskChangeHistory.parley = parleyRepository.findById(createTaskWeb.parley).orElseThrow();
        }
        taskChangeHistoryRepository.save(taskChangeHistory);

        List<TaskFieldChange> changes = createTaskWebToSetOfChanges.apply(createTaskWeb).stream()
                .peek(e -> e.changeHistory = taskChangeHistory)
                .peek(e -> e.type = "PATCH")
                .collect(Collectors.toList());
        taskFieldChangeRepository.saveAll(changes);

        return taskRepository.findById(task.id).map(taskToTaskWeb).orElseThrow();
    }

    @GetMapping("/building/{buildingId}/tasks")
    public List<TaskWeb> buildingTasks(@PathVariable @NotNull Long buildingId) {
        Building building = buildingRepository.findById(buildingId).orElseThrow();
        return taskRepository.findAllByCommentBuilding(building).stream().map(taskToTaskWeb).collect(Collectors.toList());
    }

    @GetMapping("/myTasks")
    public List<TaskWeb> getMyTasks() {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user = userRepository.findByUsername(username);
        return taskRepository.findAll().stream().map(taskToTaskWeb)
                .filter(e -> e.assignee != null)
                .filter(e -> Objects.equals(e.assignee.id, user.id))
                .collect(Collectors.toList());
    }
}
