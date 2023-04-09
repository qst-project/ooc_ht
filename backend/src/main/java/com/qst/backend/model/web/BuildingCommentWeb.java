package com.qst.backend.model.web;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BuildingCommentWeb {
    public Long id;
    public String text;
    public Long taskId;
    public UserPreviewWeb author;
    public List<BuildingCommentWeb> replies;
}
