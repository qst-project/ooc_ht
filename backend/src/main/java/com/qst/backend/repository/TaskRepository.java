package com.qst.backend.repository;


import com.qst.backend.model.pg.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}
