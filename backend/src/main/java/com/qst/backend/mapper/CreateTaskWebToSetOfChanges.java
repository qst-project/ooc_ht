package com.qst.backend.mapper;

import com.qst.backend.model.pg.TaskFieldChange;
import com.qst.backend.model.web.CreateTaskWeb;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;


@Component
public class CreateTaskWebToSetOfChanges implements Function<CreateTaskWeb, Set<TaskFieldChange>> {

    @Override
    public Set<TaskFieldChange> apply(CreateTaskWeb createTaskWeb) {
        HashSet<TaskFieldChange> fieldChanges = new HashSet<>();
        if (createTaskWeb.title != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.name = "title";
            taskFieldChange.value = createTaskWeb.title;
            fieldChanges.add(taskFieldChange);
        }
        if (createTaskWeb.about != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.name = "about";
            taskFieldChange.value = createTaskWeb.about;
            fieldChanges.add(taskFieldChange);
        }
        if (createTaskWeb.deadline != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.name = "deadline";
            taskFieldChange.value = createTaskWeb.deadline.toString();
            fieldChanges.add(taskFieldChange);
        }
        if (createTaskWeb.status != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.name = "status";
            taskFieldChange.value = createTaskWeb.status;
            fieldChanges.add(taskFieldChange);
        }
        if (createTaskWeb.assignee != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.name = "assignee";
            taskFieldChange.value = createTaskWeb.assignee.toString();
            fieldChanges.add(taskFieldChange);
        }
        return fieldChanges;
    }
}
