package com.qst.backend.runner;

import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.User;
import com.qst.backend.model.xml.CustomAttributeXML;
import com.qst.backend.repository.BuildingSaver;
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

    @Autowired
    public DataLoader(UserRepository userRepository, BuildingSaver buildingSaver) {
        this.userRepository = userRepository;
        this.buildingSaver = buildingSaver;
    }

    public void loadData() {
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
                Когда мне было четыре года, мы с родителями все лето жили у бабушки.
                Как раз в это время бабушкина собачка родила щенков. Один щенок казался
                мне особенным, и я к нему была очень привязана. Тем летом я ходила в
                местный детский сад, в котором заведующей была моя тетя. Поэтому воспитателя относились ко мне очень хорошо и разрешали все.
                  И вот в один прекрасный день мама собралась отвести меня в детский сад.
                У меня была маленькая плетеная к
                орзинка, и я спросила у мамы, можно
                ли мне её взять. Мама, естественно, разрешила. Пока она не видела, я положила в корзинку щенка, спрятала там конфеты (на случай, если щенок проголодается) и укрыла корзину покрывальцем для кукол.
                  И вот мы идем в садик. Я не подумала, что мне будет тяжело, поэтому тащила корзину еле-еле. Мама предложила помочь и,
                открыв корзину, увидела щенка. Она сказала, что со щенком 
                в садик нельзя, но на мне этот довод не показался убедительным,
                и  я поставила условие – либо я иду со щенком в сад, либо я сижу дома. А дома меня не с кем было оставить, поэтому маме пришлось разрешить мне взять щенка. В садике маме сказали, что с собакой они меня не возьмут, но мама смогла уговорить воспитательницу оставить меня до обеда, тем более что мою тётю – заведующую
                в саду побаивались.

                  После обеда мои родители пришли меня забирать. Уже начался тихий час, и все детки спали. А в спальнях были двухъярусные кровати, и моя кровать была сверху. И вот я сижу на второй полке, болтаю ногами и держу своего любимца на руках. Заходят улыбающиеся родители и воспитательница. Воспитательница говорит маме: «Ваша девочка никак не хотела ложиться спать, пришлось её посадить на кровать, чтобы она не шумела».
                  В этот момент я говорю родителям: «Родители, что ж вы так
                долго. Я уже заждалась. Щенок же кушать хочет. А конфеты я все съела! Ну, никакой у вас ответственности нет! Воспитывать себя надо!» Мой папа так громко засмеялся, что чуть не разбудил всех детей и моего щенка, который заснул на моих руках, пока мы
                ждали родителей.

                  Вот такая история со мной произошла.
                                                                                             Анна Бондаренко 
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