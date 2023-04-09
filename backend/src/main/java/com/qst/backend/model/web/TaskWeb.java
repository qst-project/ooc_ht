package com.qst.backend.model.web;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskWeb {
    Long id;
    String name;
    String status;
    String deadline;
    UserPreviewWeb assignee;
}
