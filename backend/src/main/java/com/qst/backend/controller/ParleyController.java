package com.qst.backend.controller;

import com.qst.backend.mapper.TaskToTaskWeb;
import com.qst.backend.model.pg.Parley;
import com.qst.backend.model.web.ChangeAttributeWeb;
import com.qst.backend.model.web.TaskWeb;
import com.qst.backend.repository.ParleyRepository;
import com.qst.backend.repository.TaskChangeHistoryRepository;
import com.qst.backend.repository.TaskFieldChangeRepository;
import com.qst.backend.repository.TaskRepository;
import com.qst.backend.service.SingletonCollector;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
public class ParleyController {
    final TaskToTaskWeb taskToTaskWeb;
    final ParleyRepository parleyRepository;
    final TaskRepository taskRepository;
    final TaskChangeHistoryRepository taskChangeHistoryRepository;
    final TaskFieldChangeRepository taskFieldChangeRepository;

    public ParleyController(TaskToTaskWeb taskToTaskWeb, ParleyRepository parleyRepository, TaskRepository taskRepository, TaskChangeHistoryRepository taskChangeHistoryRepository, TaskFieldChangeRepository taskFieldChangeRepository) {
        this.taskToTaskWeb = taskToTaskWeb;
        this.parleyRepository = parleyRepository;
        this.taskRepository = taskRepository;
        this.taskChangeHistoryRepository = taskChangeHistoryRepository;
        this.taskFieldChangeRepository = taskFieldChangeRepository;
    }

    @GetMapping("/parley/current")
    public Long getCurrentParleyId() {
        return parleyRepository.findTopByOrderByIdDesc().id;
    }


    @GetMapping("/parley/current/tasks")
    public Map<Long, List<TaskWeb>> getCurrentParleyTasks() {
        return taskRepository.findAll().stream()
                .map(taskToTaskWeb)
                .filter(e -> !Objects.equals(e.status, "Готово"))
                .collect(Collectors.groupingBy(e -> e.buildingId));
    }

    @GetMapping("/parley/{parleyId}/tasks")
    public Map<Long, Map<Long, ChangeAttributeWeb>> getSpecificParleyTasks(@PathVariable @NotNull Long parleyId) {
        Parley parley = parleyRepository.findById(parleyId).orElseThrow();
        return taskFieldChangeRepository.findAllByChangeHistory_ParleyOrderByChangeHistoryIdDesc(parley).stream()
                .collect(Collectors.groupingBy(e -> e.changeHistory.task.comment.building.id,
                        Collectors.groupingBy(e -> e.changeHistory.task.id,
                                Collectors.mapping(e -> new ChangeAttributeWeb(e.name, e.value, e.type),
                                        SingletonCollector.toSingleton()))));
    }
}
