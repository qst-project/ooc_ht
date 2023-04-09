package com.qst.backend.model.web;

import com.qst.backend.model.pg.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BuildingCommentWeb {
    public Long id;
    public String text;
    public UserPreviewWeb author;
    public List<BuildingCommentWeb> replies;
}
