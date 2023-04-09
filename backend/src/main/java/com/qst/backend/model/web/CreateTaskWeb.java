package com.qst.backend.model.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
public class CreateTaskWeb {
    public String status;
    public String title;
    public Long assignee;
    public String about;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "UTC")
    public Instant deadline;
    public List<Long> mentions;
    public Long replyTo;
}
