package com.cs431.household_manager_application.model;

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

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user", referencedColumnName = "user_id")
    private User assignedTo;

    @ManyToOne()
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;

    private String choreName;
    private Date dueDate;
    private boolean isComplete;
    public Chore(Household household, String choreName, Date dueDate, User assignedTo, boolean isComplete) {
        this.household = household;
        this.choreName = choreName;
        this.dueDate = dueDate;
        this.assignedTo = assignedTo;
        this.isComplete = isComplete;
    }
}
