package com.qst.backend.model.web;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskWeb {
    Long id;
    String title;
    String about;
    String status;
    String deadline;
    UserPreviewWeb assignee;
}
