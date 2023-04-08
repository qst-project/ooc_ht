package com.qst.backend.repository;


import com.qst.backend.model.pg.Building;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface BuildingRepository extends CrudRepository<Building, Long> {
    public Page<Building> findAll(Pageable pageable);


}
