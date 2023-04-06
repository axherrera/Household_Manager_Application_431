package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    @OneToMany(cascade = CascadeType.ALL, targetEntity = User.class)
    @JoinColumn(name = "household_id", referencedColumnName = "household_id")
    private List<User> roommates;

}
