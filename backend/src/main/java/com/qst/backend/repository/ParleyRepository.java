package com.qst.backend.repository;


import com.qst.backend.model.pg.Parley;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;

@Transactional
public interface ParleyRepository extends CrudRepository<Parley, Long> {

    public Parley findTopByOrderByIdDesc();
}
