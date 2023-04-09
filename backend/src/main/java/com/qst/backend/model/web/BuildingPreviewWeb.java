package com.qst.backend.model.web;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BuildingPreviewWeb {
    Long id;
    String name;
    String type;
    String address;
    String district;
    String county;
    String status;
}
