package com.qst.backend.controller;

import com.qst.backend.model.pg.File;
import com.qst.backend.repository.FileRepository;
import com.qst.backend.service.MinioService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {
    private final MinioService minioService;
    private final FileRepository fileRepository;

    public FileController(MinioService minioService, FileRepository fileRepository) {
        this.minioService = minioService;
        this.fileRepository = fileRepository;
    }


    @GetMapping("/download/{hash}")
    public void download(@PathVariable String hash, HttpServletResponse response) throws IOException {
        File file = fileRepository.getFirstByHash(hash);

        InputStream inputStream = minioService.get(Path.of("/" + hash));
        IOUtils.copy(inputStream, response.getOutputStream());

        response.addHeader("Content-disposition", "attachment;filename=" + file.name);
        response.setContentType(URLConnection.guessContentTypeFromName(file.name));

        response.flushBuffer();
    }

    @PostMapping("/upload/{name}")
    public String upload(@RequestParam(name = "file") MultipartFile inputFile, @PathVariable String name) {
        File file = new File();
        file.hash = UUID.randomUUID().toString();
        file.name = name;
        file.path = String.valueOf(Path.of("/" + file.hash));
        try {
            minioService.upload(Path.of(file.path), inputFile.getInputStream());
            fileRepository.save(file);
        } catch (IOException e) {
            throw new IllegalStateException("The file cannot be read", e);
        }
        return file.hash;
    }
    @PostMapping("/resolveName/{hash}")
    public String meta(@PathVariable String hash) {
        File file = fileRepository.getFirstByHash(hash);
        return file.name;
    }
}