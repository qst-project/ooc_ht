package com.qst.backend;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.spi.json.GsonJsonProvider;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class BuildingRestControllerTest {
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .build();
    }

    String readJsonProperty(String json, String jsonpath) {
        Configuration conf = Configuration.builder().jsonProvider(new GsonJsonProvider()).build();

        return JsonPath.using(conf).parse(json).read(jsonpath).toString().replace("\"", "");
    }

//    @Test
    void createAndGetBuilding() throws Exception {
        String sampleRequest = """
                {
                    "name": "value_name",
                    "county": "value_county",
                    "district": "value_district",
                    "address": "value_address",
                    "type": "value_type",
                    "condition": "value_condition",
                    "area": "value_area",
                    "owner": "value_owner",
                    "fact_owner": "value_fact_owner",
                    "about": "value_about",
                    "customAttributes": {"group":{"name":{"value":"2012", "meta":"{}"}}}
                }
                               """;
        MvcResult createBuildingResult = mockMvc.perform(post("/building", 42L)
                        .contentType("application/json")
                        .content(sampleRequest))
                .andExpect(status().isOk()).andReturn();
        String buildingId = createBuildingResult.getResponse().getContentAsString();
        MvcResult getBuildingResult = mockMvc.perform(get("/building/%s".formatted(buildingId), 42L)
                        .contentType("application/json")
                        .content(sampleRequest))
                .andExpect(status().isOk()).andReturn();
        String building = getBuildingResult.getResponse().getContentAsString();
        Assertions.assertEquals("2012", readJsonProperty(building, "$.customAttributes.group.name[0].value"));
        Assertions.assertEquals("value_name", readJsonProperty(building, "$.name"));
        Assertions.assertEquals("value_county", readJsonProperty(building, "$.county"));
        Assertions.assertEquals("value_district", readJsonProperty(building, "$.district"));
        Assertions.assertEquals("value_address", readJsonProperty(building, "$.address"));
        Assertions.assertEquals("value_type", readJsonProperty(building, "$.type"));
        Assertions.assertEquals("value_condition", readJsonProperty(building, "$.condition"));
        Assertions.assertEquals("value_area", readJsonProperty(building, "$.area"));
        Assertions.assertEquals("value_owner", readJsonProperty(building, "$.owner"));
        Assertions.assertEquals("value_fact_owner", readJsonProperty(building, "$.fact_owner"));
        Assertions.assertEquals("value_about", readJsonProperty(building, "$.about"));
    }
}