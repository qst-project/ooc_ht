package com.qst.backend.repository;


import com.qst.backend.model.pg.BuildingComment;
import org.springframework.data.repository.CrudRepository;

public interface BuildingCommentRepository extends CrudRepository<BuildingComment, Long> {

}
