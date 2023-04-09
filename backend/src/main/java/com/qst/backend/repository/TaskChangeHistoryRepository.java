package com.qst.backend.repository;


import com.qst.backend.model.pg.Parley;
import com.qst.backend.model.pg.TaskChangeHistory;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskChangeHistoryRepository extends CrudRepository<TaskChangeHistory, Long> {
    List<TaskChangeHistory> findAllByParley(Parley parley);
}
