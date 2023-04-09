package com.qst.backend;

import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.Parley;
import com.qst.backend.repository.BuildingRepository;
import com.qst.backend.repository.ParleyRepository;
import com.qst.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@ComponentScan("com.qst.backend.repository")
class ParleyRestControllerIT {
    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private ParleyRepository parleyRepository;
    @Autowired
    private UserRepository userRepository;
    private MockMvc mockMvc;


    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .build();
    }


    @Test
    @WithMockUser(username = "user1", password = "pwd", roles = "USER")
    void specificParleyTasks() throws Exception {
        Parley parley = new Parley();
        parleyRepository.save(parley);

        Building building = new Building();
        buildingRepository.save(building);

        String createTask = """
                {
                    "title": "my comment",
                    "parley": %s
                }
                """.formatted(parley.id);
        mockMvc.perform(post("/building/%s/task".formatted(building.id))
                .contentType("application/json")
                .content(createTask)).andExpect(status().isOk());

        mockMvc.perform(get("/parley/%s/tasks".formatted(parley.id)))
                .andExpectAll(
                        status().isOk()
                );
    }
}