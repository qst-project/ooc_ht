package com.qst.backend.service;

import com.qst.backend.model.pg.Building;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

@Component
public class BuildingsArchiveService {
    final BuildingXmlService buildingXmlService;

    public BuildingsArchiveService(BuildingXmlService buildingXmlService) {
        this.buildingXmlService = buildingXmlService;
    }

    public byte[] createArchiveFromBuildings(Iterable<Long> ids) {
        ByteArrayOutputStream res = new ByteArrayOutputStream();
        try (ZipOutputStream output = new ZipOutputStream(res)) {
            for (Long id : ids) {
                String buildingXML = buildingXmlService.createXmlFromBuilding(id);
                String name = UUID.randomUUID() + ".xml";
                ZipEntry entry = new ZipEntry(name);

                output.putNextEntry(entry);
                output.write(buildingXML.getBytes());
                output.closeEntry();
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        return res.toByteArray();
    }

    public List<Building> createBuildingsFromArchive(InputStream archive) {
        List<Building> res = new ArrayList<>();
        try (ZipInputStream zipInput = new ZipInputStream(archive)) {
            ZipEntry entry;
            while ((entry = zipInput.getNextEntry()) != null) {
                ByteArrayOutputStream outStream = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int length;
                while ((length = zipInput.read(buffer)) != -1) {
                    outStream.write(buffer, 0, length);
                }
                byte[] xmlData = outStream.toByteArray();
                ByteArrayInputStream xmlDataInputStream = new ByteArrayInputStream(xmlData);
                Building building = buildingXmlService.createBuildingFromXml(xmlDataInputStream);
                res.add(building);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return res;
    }
}
