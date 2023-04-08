package com.qst.backend.mapper;

import com.qst.backend.model.pg.BuildingCustomAttribute;
import com.qst.backend.model.xml.CustomAttributeXML;
import org.springframework.stereotype.Component;

import java.util.function.Function;


@Component
public class CustomAttributeXMLToCustomAttribute implements Function<CustomAttributeXML, BuildingCustomAttribute> {


    @Override
    public BuildingCustomAttribute apply(CustomAttributeXML customAttributeXML) {
        BuildingCustomAttribute buildingCustomAttribute = new BuildingCustomAttribute();
        buildingCustomAttribute.groupName = customAttributeXML.groupName;
        buildingCustomAttribute.name = customAttributeXML.name;
        buildingCustomAttribute.value = customAttributeXML.value;
        buildingCustomAttribute.meta = customAttributeXML.meta;
        return buildingCustomAttribute;
    }
}
