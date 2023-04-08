package com.qst.backend.models.web;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class CreateCustomAttributeWeb {
    String value;
    String meta;
}
