package com.qst.backend.model.web;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskWeb {
    public Long id;
    public String title;
    public String about;
    public String status;
    public String deadline;
    public UserPreviewWeb assignee;
}
