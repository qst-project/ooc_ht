package com.qst.backend.model.web;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class CreateBuildingCommentWeb {
    public String text;
    public List<Long> mentions;
    public Long replyTo;
}
