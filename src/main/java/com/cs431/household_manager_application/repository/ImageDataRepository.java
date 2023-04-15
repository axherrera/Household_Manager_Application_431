package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageDataRepository extends JpaRepository<ImageData, Long> {

    Optional<ImageData> findByName(String fileName);
}
