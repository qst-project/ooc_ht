package com.qst.backend.repository;


import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.BuildingComment;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@Transactional
public interface BuildingCommentRepository extends CrudRepository<BuildingComment, Long> {
    List<BuildingComment> findAllByBuilding(Building building);
    List<BuildingComment> findAllByParent(BuildingComment parent);
}
