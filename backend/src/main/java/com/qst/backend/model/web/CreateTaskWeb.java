package com.qst.backend.model.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class CreateTaskWeb {
    public String status;
    public String title;
    public String text;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSSZ",timezone = "UTC")
    public Instant deadline;
    public List<Long> mentions;
    public Long replyTo;
}
