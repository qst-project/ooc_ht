package com.qst.backend.mapper;

import com.qst.backend.model.pg.BuildingCustomAttribute;
import com.qst.backend.model.xml.CustomAttributeXML;
import org.springframework.stereotype.Component;

import java.util.function.Function;


@Component
public class CustomAttributeToCustomAttributeXML implements Function<BuildingCustomAttribute, CustomAttributeXML> {


    @Override
    public CustomAttributeXML apply(BuildingCustomAttribute buildingCustomAttribute) {
        return new CustomAttributeXML(
                buildingCustomAttribute.name,
                buildingCustomAttribute.value,
                buildingCustomAttribute.meta,
                buildingCustomAttribute.groupName
        );
    }
}
