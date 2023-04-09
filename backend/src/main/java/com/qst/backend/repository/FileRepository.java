package com.qst.backend.repository;


import com.qst.backend.model.pg.File;
import org.springframework.data.repository.CrudRepository;

public interface FileRepository extends CrudRepository<File, Long> {
    File getFirstByHash(String hash);
}
