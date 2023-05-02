package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.ImageData;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface ImageDataService {
    Optional<ImageData> findByName(String filename);
    String uploadImage (MultipartFile file) throws IOException;
    byte[] downloadImage (String filename) throws IOException;
}
