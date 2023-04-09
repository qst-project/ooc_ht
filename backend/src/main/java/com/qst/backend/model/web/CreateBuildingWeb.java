package com.qst.backend.model.web;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class CreateBuildingWeb {
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
    public String status;
    public String description;

    Map<String, Map<String, CreateCustomAttributeWeb>> customAttributes;
}
