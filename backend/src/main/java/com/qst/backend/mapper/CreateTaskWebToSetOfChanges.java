package com.qst.backend.mapper;

import com.qst.backend.model.pg.BuildingComment;
import com.qst.backend.model.pg.TaskFieldChange;
import com.qst.backend.model.web.BuildingCommentWeb;
import com.qst.backend.model.web.CreateTaskWeb;
import com.qst.backend.model.web.UserPreviewWeb;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;


@Component
public class CreateTaskWebToSetOfChanges implements Function<CreateTaskWeb, Set<TaskFieldChange>> {

    @Override
    public Set<TaskFieldChange> apply(CreateTaskWeb createTaskWeb) {
        HashSet<TaskFieldChange> fieldChanges = new HashSet<>();
        if (createTaskWeb.title != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.type = "POST";
            taskFieldChange.name = "title";
            taskFieldChange.value = createTaskWeb.title;
            fieldChanges.add(taskFieldChange);
        }
        if (createTaskWeb.deadline != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.type = "POST";
            taskFieldChange.name = "deadline";
            taskFieldChange.value = createTaskWeb.deadline.toString();
            fieldChanges.add(taskFieldChange);
        }
        if (createTaskWeb.text != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.type = "POST";
            taskFieldChange.name = "text";
            taskFieldChange.value = createTaskWeb.text;
            fieldChanges.add(taskFieldChange);
        }
        if (createTaskWeb.status != null) {
            TaskFieldChange taskFieldChange = new TaskFieldChange();
            taskFieldChange.type = "POST";
            taskFieldChange.name = "status";
            taskFieldChange.value = createTaskWeb.status;
            fieldChanges.add(taskFieldChange);
        }
        return fieldChanges;
    }
}
