package com.qst.backend.repository;


import com.qst.backend.mapper.CustomAttributeXMLToCustomAttribute;
import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.BuildingCustomAttribute;
import com.qst.backend.model.web.CreateCustomAttributeWeb;
import com.qst.backend.model.xml.CustomAttributeXML;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class BuildingSaver {
    final BuildingRepository buildingRepository;
    final BuildingCustomAttributeRepository buildingCustomAttributeRepository;
    final CustomAttributeXMLToCustomAttribute customAttributeXMLToCustomAttribute;

    public BuildingSaver(BuildingRepository buildingRepository, BuildingCustomAttributeRepository buildingCustomAttributeRepository, CustomAttributeXMLToCustomAttribute customAttributeXMLToCustomAttribute) {
        this.buildingRepository = buildingRepository;
        this.buildingCustomAttributeRepository = buildingCustomAttributeRepository;
        this.customAttributeXMLToCustomAttribute = customAttributeXMLToCustomAttribute;
    }

    public Building saveWithProperties(Building building, Map<String, Map<String, CreateCustomAttributeWeb>> properties) {
        buildingRepository.save(building);
        for (Map.Entry<String, Map<String, CreateCustomAttributeWeb>> group : properties.entrySet()) {
            String groupName = group.getKey();
            for (Map.Entry<String, CreateCustomAttributeWeb> attribute : group.getValue().entrySet()) {
                String name = attribute.getKey();
                String value = attribute.getValue().getValue();
                String meta = attribute.getValue().getMeta();
                BuildingCustomAttribute buildingCustomAttribute = BuildingCustomAttribute.create(building, groupName, name, value, meta);
                buildingCustomAttributeRepository.save(buildingCustomAttribute);
            }
        }
        return building;
    }

    public Building saveWithProperties(Building building, List<CustomAttributeXML> properties) {
        buildingRepository.save(building);
        List<BuildingCustomAttribute> attributes = properties.stream()
                .map(customAttributeXMLToCustomAttribute)
                .peek(e -> e.building = building)
                .collect(Collectors.toList());
        buildingCustomAttributeRepository.saveAll(attributes);
        return building;
    }
}
