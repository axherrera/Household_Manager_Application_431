package com.cs431.household_manager_application.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chores")

public class Chore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    @Column(name = "chore_id")
    private Long choreId;

    @ManyToOne()
    @JoinColumn(name = "fk_user", referencedColumnName = "user_id")
    @JsonIgnoreProperties({"household", "password", "username", "fname", "lname"})
    private User assignedTo;

    @ManyToOne()
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;

    private String choreName;
    private Date dueDate;
    private boolean isComplete;
    public Chore(User assignedTo, Household household,  String choreName, Date dueDate,  boolean isComplete) {
        this.assignedTo = assignedTo;
        this.household = household;
        this.choreName = choreName;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
    }
}
