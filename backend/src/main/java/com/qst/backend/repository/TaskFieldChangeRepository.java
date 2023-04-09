package com.qst.backend.repository;


import com.qst.backend.model.pg.Parley;
import com.qst.backend.model.pg.Task;
import com.qst.backend.model.pg.TaskFieldChange;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;

public interface TaskFieldChangeRepository extends CrudRepository<TaskFieldChange, Long> {
    TaskFieldChange findFirstByNameEqualsAndTypeInOrderByChangeHistoryIdDesc(String name, Collection<String> type);

    TaskFieldChange findFirstByChangeHistory_TaskAndTypeInAndNameEqualsOrderByChangeHistoryIdDesc(Task changeHistory_task, Collection<String> type, String name);

    List<TaskFieldChange> findAllByChangeHistory_ParleyOrderByChangeHistoryIdDesc(Parley parley);
}
