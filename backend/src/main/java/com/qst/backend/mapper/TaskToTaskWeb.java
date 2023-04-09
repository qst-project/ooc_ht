package com.qst.backend.mapper;

import com.qst.backend.model.pg.Task;
import com.qst.backend.model.pg.TaskFieldChange;
import com.qst.backend.model.web.TaskWeb;
import com.qst.backend.model.web.UserPreviewWeb;
import com.qst.backend.repository.TaskFieldChangeRepository;
import com.qst.backend.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;


@Component
public class TaskToTaskWeb implements Function<Task, TaskWeb> {
    final TaskFieldChangeRepository taskFieldChangeRepository;
    final UserToUserPreviewWeb userToUserPreviewWeb;
    final UserRepository userRepository;

    public TaskToTaskWeb(TaskFieldChangeRepository taskFieldChangeRepository, UserToUserPreviewWeb userToUserPreviewWeb, UserRepository userRepository) {
        this.taskFieldChangeRepository = taskFieldChangeRepository;
        this.userToUserPreviewWeb = userToUserPreviewWeb;
        this.userRepository = userRepository;
    }

    @Override
    public TaskWeb apply(Task task) {
        List<String> types = List.of("POST", "PATCH");
        TaskFieldChange name = taskFieldChangeRepository.getTaskFieldChangeByNameEqualsAndTypeInOrderByChangeHistoryIdDesc("name", types);
        TaskFieldChange status = taskFieldChangeRepository.getTaskFieldChangeByNameEqualsAndTypeInOrderByChangeHistoryIdDesc("status", types);
        TaskFieldChange deadline = taskFieldChangeRepository.getTaskFieldChangeByNameEqualsAndTypeInOrderByChangeHistoryIdDesc("deadline", types);
        TaskFieldChange assignee = taskFieldChangeRepository.getTaskFieldChangeByNameEqualsAndTypeInOrderByChangeHistoryIdDesc("assignee", types);
        Long assigneeId = Long.valueOf(assignee.value);
        UserPreviewWeb assigneePreview = userRepository.findById(assigneeId).map(userToUserPreviewWeb).orElseThrow();
        return new TaskWeb(
                task.id,
                name.value,
                status.value,
                deadline.value,
                assigneePreview
        );
    }
}
