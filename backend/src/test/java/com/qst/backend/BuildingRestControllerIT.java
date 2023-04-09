package com.qst.backend;

import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.User;
import com.qst.backend.repository.BuildingRepository;
import com.qst.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@ComponentScan("com.qst.backend.repository")
class BuildingRestControllerIT {
    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private UserRepository userRepository;
    private MockMvc mockMvc;


    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .build();
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

    @Test
    @WithMockUser(username = "user1", password = "pwd", roles = "USER")
    void createCommentAndGet() throws Exception {
        Building building = new Building();
        buildingRepository.save(building);
        User user = new User();
        user.username = UUID.randomUUID().toString();
        user.password = "2";
        userRepository.save(user);
        String createComment = """
                {
                    "text": "my comment",
                    "mentions": [%s]
                }
                """.formatted(user.id);
        String id = mockMvc.perform(post("/building/%s/comment".formatted(building.id))
                .contentType("application/json")
                .content(createComment)
        ).andReturn().getResponse().getContentAsString();
        long commentId = Long.parseLong(id);
        mockMvc.perform(get("/building/%s/comments".formatted(building.id)))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$[0].text").value(("my comment"))
                );

        String createReply = """
                {
                    "text": "reply",
                    "replyTo": [%s]
                }
                """.formatted(commentId);
        mockMvc.perform(post("/building/%s/comment".formatted(building.id))
                        .contentType("application/json")
                        .content(createReply)
                )
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$[0].replies[0].about").value(("my comment"))
                );
    }

    @Test
    @WithMockUser(username = "user1", password = "pwd", roles = "USER")
    void createTaskAndGet() throws Exception {
        Building building = new Building();
        buildingRepository.save(building);
        User user = new User();
        user.username = UUID.randomUUID().toString();
        user.password = "2";
        userRepository.save(user);

        String createTask = """
                {
                    "title": "my comment",
                    "about": "about",
                    "status": "new",
                    "assignee": %s
                }
                """.formatted(user.id);
        String id = mockMvc.perform(post("/building/%s/task".formatted(building.id))
                .contentType("application/json")
                .content(createTask)
        ).andReturn().getResponse().getContentAsString();
        mockMvc.perform(get("/building/%s/comment/%s/task".formatted(building.id, id)))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$.title").value(("my comment")),
                        jsonPath("$.assignee.username").value((user.username))
                );
        String patchTask = """
                {
                    "title": "changed comment"
                }
                """;
        mockMvc.perform(patch("/building/%s/comment/%s/task".formatted(building.id, id))
                        .contentType("application/json")
                        .content(patchTask))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$.title").value(("changed comment"))
                );
    }
}