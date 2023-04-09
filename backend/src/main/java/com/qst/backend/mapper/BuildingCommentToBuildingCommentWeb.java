package com.qst.backend.mapper;

import com.qst.backend.model.pg.BuildingComment;
import com.qst.backend.model.web.BuildingCommentWeb;
import com.qst.backend.model.web.UserPreviewWeb;
import com.qst.backend.repository.BuildingCommentRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;


@Component
public class BuildingCommentToBuildingCommentWeb implements Function<BuildingComment, BuildingCommentWeb> {
    final UserToUserPreviewWeb userToUserPreviewWeb;
    final BuildingCommentRepository buildingCommentRepository;

    public BuildingCommentToBuildingCommentWeb(UserToUserPreviewWeb userToUserPreviewWeb, BuildingCommentRepository buildingCommentRepository) {
        this.userToUserPreviewWeb = userToUserPreviewWeb;
        this.buildingCommentRepository = buildingCommentRepository;
    }

    @Override
    public BuildingCommentWeb apply(BuildingComment buildingComment) {
        UserPreviewWeb userPreviewWeb = userToUserPreviewWeb.apply(buildingComment.author);
        List<BuildingCommentWeb> replies = buildingCommentRepository.findAllByParent(buildingComment).stream()
                .map(new BuildingCommentToBuildingCommentWeb(userToUserPreviewWeb, buildingCommentRepository))
                .toList();
        return new BuildingCommentWeb(buildingComment.id, buildingComment.text, userPreviewWeb, replies);
    }
}
