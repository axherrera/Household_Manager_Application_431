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
    @Generated
    @Column(name = "chore_id")
    private Long choreId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user", referencedColumnName = "user_id")
    private User assignedTo;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;

    private String name;
    private boolean isRotated;
    private int frequency;
    private Date duedate;
    private boolean isComplete;
}
