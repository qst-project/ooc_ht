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

    public String getValueOrNull(TaskFieldChange taskFieldChange) {
        if (taskFieldChange == null) {
            return null;
        }
        return taskFieldChange.value;
    }

    @Override
    public TaskWeb apply(Task task) {
        List<String> types = List.of("POST", "PATCH");
        TaskFieldChange title = taskFieldChangeRepository.findFirstByChangeHistory_TaskAndTypeInAndNameEqualsOrderByChangeHistoryIdDesc(task, types, "title");
        TaskFieldChange about = taskFieldChangeRepository.findFirstByChangeHistory_TaskAndTypeInAndNameEqualsOrderByChangeHistoryIdDesc(task, types, "about");
        TaskFieldChange status = taskFieldChangeRepository.findFirstByChangeHistory_TaskAndTypeInAndNameEqualsOrderByChangeHistoryIdDesc(task, types, "status");
        TaskFieldChange deadline = taskFieldChangeRepository.findFirstByChangeHistory_TaskAndTypeInAndNameEqualsOrderByChangeHistoryIdDesc(task, types, "deadline");
        TaskFieldChange assignee = taskFieldChangeRepository.findFirstByChangeHistory_TaskAndTypeInAndNameEqualsOrderByChangeHistoryIdDesc(task, types, "assignee");
        UserPreviewWeb assigneePreview = assignee != null ? userRepository.findById(Long.valueOf(assignee.value)).map(userToUserPreviewWeb).orElseThrow() : null;
        return new TaskWeb(
                task.id,
                getValueOrNull(title),
                getValueOrNull(about),
                getValueOrNull(status),
                getValueOrNull(deadline),
                assigneePreview
        );
    }
}
