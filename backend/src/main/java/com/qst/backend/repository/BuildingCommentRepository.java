package com.qst.backend.repository;


import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.BuildingComment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BuildingCommentRepository extends CrudRepository<BuildingComment, Long> {
    List<BuildingComment> findAllByBuilding(Building building);
}
