package com.qst.backend.repository;


import com.qst.backend.model.pg.TaskFieldChange;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface TaskFieldChangeRepository extends CrudRepository<TaskFieldChange, Long> {
    TaskFieldChange getTaskFieldChangeByNameEqualsAndTypeInOrderByChangeHistoryIdDesc(String name, Collection<String> type);
}
