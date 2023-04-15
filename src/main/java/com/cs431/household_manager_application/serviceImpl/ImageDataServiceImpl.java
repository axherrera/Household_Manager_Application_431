package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.model.ImageData;
import com.cs431.household_manager_application.repository.ImageDataRepository;
import com.cs431.household_manager_application.service.ImageDataService;
import com.cs431.household_manager_application.utils.ImageDataUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageDataServiceImpl implements ImageDataService {

    ImageDataRepository imageDataRepository;

    public ImageDataServiceImpl(ImageDataRepository imageDataRepository) {
        this.imageDataRepository = imageDataRepository;
    }

    @Override
    public Optional<ImageData> findByName(String filename) {
        return Optional.empty();
    }

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        ImageData imageData = imageDataRepository.save(ImageData.builder()
                .photoName(file.getOriginalFilename())
                .imageData(ImageDataUtils.compressImage(file.getBytes())).build()
        );
        if(imageData!=null)
            return "file uploaded successfully : " + file.getOriginalFilename();
        return null;
    }

    @Override
    public byte[] downloadImage(String filename) throws IOException {
        Optional<ImageData> dbImage = imageDataRepository.findByPhotoName(filename);
        return ImageDataUtils.decompressImage(dbImage.get().getImageData());

    }

}
