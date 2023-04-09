package com.qst.backend.runner;

import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.Parley;
import com.qst.backend.model.pg.User;
import com.qst.backend.model.xml.CustomAttributeXML;
import com.qst.backend.repository.BuildingSaver;
import com.qst.backend.repository.ParleyRepository;
import com.qst.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    private final UserRepository userRepository;
    private final BuildingSaver buildingSaver;
    private final ParleyRepository parleyRepository;

    @Autowired
    public DataLoader(UserRepository userRepository, BuildingSaver buildingSaver, ParleyRepository parleyRepository) {
        this.userRepository = userRepository;
        this.buildingSaver = buildingSaver;
        this.parleyRepository = parleyRepository;
    }

    public void loadData() {
        Parley parley = new Parley();
        parleyRepository.save(parley);

        User admin = new User();
        admin.password = "admin";
        admin.username = "admin";
        userRepository.save(admin);

        User user = new User();
        user.password = "user";
        user.username = "user";
        userRepository.save(user);

        Building building = new Building();
        building.name = "Здание";
        building.county = "Московкий";
        building.district = "Питерский";
        building.address = "Колотушкина 14";
        building.type = "начато";
        building.condition = "плохое";
        building.area = "200 м2";
        building.owner = "Иван А";
        building.fact_owner = "Ирина К";
        building.about = """
                Когда мне было четыре         Анна Бондаренко 
                                """;
        List<CustomAttributeXML> attributes = List.of(
                new CustomAttributeXML("длина х", "12", "", "длина"),
                new CustomAttributeXML("длина у", "2", "", "длина"),
                new CustomAttributeXML("длина з", "22", "", "длина"),

                new CustomAttributeXML("документ НИИ", "наверное", "", "документация"),
                new CustomAttributeXML("документ МАОЙ", "нет", "", "документация"),
                new CustomAttributeXML("документ ФЫЗ-12", "есть", "", "документация")
        );
        buildingSaver.saveWithProperties(building, attributes);
    }

    public void run(ApplicationArguments args) {
        try {
            loadData();
        } catch (Exception ignored) {

        }
    }
}