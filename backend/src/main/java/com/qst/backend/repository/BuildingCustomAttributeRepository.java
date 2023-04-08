package com.qst.backend.repository;


import com.qst.backend.models.pg.Building;
import com.qst.backend.models.pg.BuildingCustomAttribute;
import org.springframework.data.repository.CrudRepository;

public interface BuildingCustomAttributeRepository extends CrudRepository<BuildingCustomAttribute, Long> {

}
