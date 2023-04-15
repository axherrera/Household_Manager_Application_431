package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "photos")
public class ImageData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoID;

    private String photoName;

    @Lob
    @Column(name = "image_data", length = 1000)
    private byte [] imageData;

}
