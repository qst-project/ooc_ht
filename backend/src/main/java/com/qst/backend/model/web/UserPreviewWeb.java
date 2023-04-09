package com.qst.backend.model.web;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPreviewWeb {
    public String username;
    public String fullName;
    public Long id;
}
