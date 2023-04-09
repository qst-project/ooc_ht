package com.qst.backend.mapper;

import com.qst.backend.model.pg.BuildingComment;
import com.qst.backend.model.web.BuildingCommentWeb;
import com.qst.backend.model.web.UserPreviewWeb;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;


@Component
public class BuildingCommentToBuildingCommentWeb implements Function<BuildingComment, BuildingCommentWeb> {
    final UserToUserPreviewWeb userToUserPreviewWeb;

    public BuildingCommentToBuildingCommentWeb(UserToUserPreviewWeb userToUserPreviewWeb) {
        this.userToUserPreviewWeb = userToUserPreviewWeb;
    }

    @Override
    public BuildingCommentWeb apply(BuildingComment buildingComment) {
        UserPreviewWeb userPreviewWeb = userToUserPreviewWeb.apply(buildingComment.author);
        List<BuildingCommentWeb> replies = buildingComment.replies.stream()
                .map(new BuildingCommentToBuildingCommentWeb(userToUserPreviewWeb))
                .toList();
        return new BuildingCommentWeb(buildingComment.id, buildingComment.text, userPreviewWeb, replies);
    }
}
