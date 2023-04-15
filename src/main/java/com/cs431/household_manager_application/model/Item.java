package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "items")
public class Item { //TODO: add photoID FK

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    @Column(name = "item_id")
    private Long itemID;

    private String name;
    private double price;
}
