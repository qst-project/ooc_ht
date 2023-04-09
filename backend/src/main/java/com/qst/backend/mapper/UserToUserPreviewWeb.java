package com.qst.backend.mapper;

import com.qst.backend.model.pg.User;
import com.qst.backend.model.web.UserPreviewWeb;
import org.springframework.stereotype.Component;

import java.util.function.Function;


@Component
public class UserToUserPreviewWeb implements Function<User, UserPreviewWeb> {


    @Override
    public UserPreviewWeb apply(User user) {
        if (user == null) {
            return null;
        }
        return new UserPreviewWeb(user.username, user.fullName, user.id);
    }
}
