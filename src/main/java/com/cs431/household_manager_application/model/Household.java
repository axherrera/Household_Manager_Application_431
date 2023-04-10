package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "households")
public class Household {

    @Id
    @GeneratedValue
    @Column( name = "household_id")
    private Long householdId;

    private String householdName;


}
