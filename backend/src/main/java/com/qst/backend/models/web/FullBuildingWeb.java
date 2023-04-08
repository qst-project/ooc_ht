package com.qst.backend.models.web;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class FullBuildingWeb {
    public Long id;
    public String name;
    public String county;
    public String district;
    public String address;
    public String type;
    public String condition;
    public String area;
    public String owner;
    public String fact_owner;
    public String about;

    Map<String, Map<String, List<CreateCustomAttributeWeb>>> customAttributes;
}
