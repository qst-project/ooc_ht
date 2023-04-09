package com.qst.backend.repository;


import com.qst.backend.model.pg.TaskChangeHistory;
import org.springframework.data.repository.CrudRepository;

public interface TaskChangeHistoryRepository extends CrudRepository<TaskChangeHistory, Long> {
}
