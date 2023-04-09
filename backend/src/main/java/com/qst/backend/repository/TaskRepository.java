package com.qst.backend.repository;


import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface TaskRepository extends CrudRepository<Task, Long> {

    public Set<Task> findAllByCommentBuilding(Building building);
}
