package com.qst.backend.model.xml;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement(name = "document")
public class BuildingXML {
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

    public List<CustomAttributeXML> customAttributes;
}
