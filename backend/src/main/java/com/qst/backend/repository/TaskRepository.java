package com.qst.backend.repository;


import com.qst.backend.model.pg.Building;
import com.qst.backend.model.pg.Task;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    public List<Task> findAllByCommentBuilding(Building building);

    public @NotNull List<Task> findAll();
}
