package com.qst.backend;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.spi.json.GsonJsonProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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

    @Test
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
                    "customAttributes": {
                        "group": {
                            "name": {
                                "value": "2012",
                                "meta": "{}"
                            }
                        },
                        "group2": {
                            "name2": {
                                "value": "20122",
                                "meta": "{\\"type\\":\\"string\\"}"
                            }
                        }
                    }
                }
                               """;
        MvcResult createBuildingResult = mockMvc.perform(post("/building")
                        .contentType("application/json")
                        .content(sampleRequest))
                .andExpect(status().isOk()).andReturn();
        String buildingId = createBuildingResult.getResponse().getContentAsString();
        mockMvc.perform(get("/building/%s".formatted(buildingId)).contentType("application/json").content(sampleRequest))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$.customAttributes.group.name.value").value(("2012")),
                        jsonPath("$.name").value(("value_name")),
                        jsonPath("$.county").value("value_county"),
                        jsonPath("$.district").value("value_district"),
                        jsonPath("$.address").value("value_address"),
                        jsonPath("$.type").value("value_type"),
                        jsonPath("$.condition").value("value_condition"),
                        jsonPath("$.area").value("value_area"),
                        jsonPath("$.owner").value("value_owner"),
                        jsonPath("$.fact_owner").value("value_fact_owner"),
                        jsonPath("$.about").value("value_about")
                )
        ;
        byte[] zipArchive = mockMvc.perform(get("/buildings/%s/export".formatted(buildingId))).andReturn().getResponse().getContentAsByteArray();
        MockMultipartFile file = new MockMultipartFile("file", zipArchive);
        mockMvc.perform(MockMvcRequestBuilders.multipart("/buildings/import").file(file))
                .andExpect(status().isOk());
    }

}