package com.qst.backend.service;

import com.qst.backend.mapper.BuildingToBuildingXML;
import com.qst.backend.mapper.BuildingXMLToBuilding;
import com.qst.backend.model.pg.Building;
import com.qst.backend.model.xml.BuildingXML;
import com.qst.backend.repository.BuildingRepository;
import com.qst.backend.repository.BuildingSaver;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXB;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.InputStream;
import java.io.StringWriter;

@Component
public class BuildingXmlService {
    final BuildingRepository buildingRepository;
    final BuildingToBuildingXML buildingToBuildingXML;
    final BuildingXMLToBuilding buildingXMLToBuilding;
    final BuildingSaver buildingSaver;

    public BuildingXmlService(BuildingRepository buildingRepository, BuildingToBuildingXML buildingToBuildingXML, BuildingXMLToBuilding buildingXMLToBuilding, BuildingSaver buildingSaver) {
        this.buildingRepository = buildingRepository;
        this.buildingToBuildingXML = buildingToBuildingXML;
        this.buildingXMLToBuilding = buildingXMLToBuilding;
        this.buildingSaver = buildingSaver;
    }

    public Building createBuildingFromXml(InputStream xmlFile) {
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(BuildingXML.class);
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            BuildingXML buildingXML = (BuildingXML) jaxbUnmarshaller.unmarshal(xmlFile);
            Building building = buildingXMLToBuilding.apply(buildingXML);
            building = buildingSaver.saveWithProperties(building, buildingXML.customAttributes);
            return building;
        } catch (JAXBException e) {
            throw new RuntimeException(e);
        }
    }

    public String createXmlFromBuilding(Long id) {
        Building building = buildingRepository.findById(id).orElseThrow();
        BuildingXML buildingXML = buildingToBuildingXML.apply(building);
        StringWriter sw = new StringWriter();
        JAXB.marshal(buildingXML, sw);
        return sw.toString();
    }
}
