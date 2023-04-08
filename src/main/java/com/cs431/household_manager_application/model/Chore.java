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

//    @ManyToOne(   cascade = CascadeType.ALL, targetEntity = User.class)
//    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
//    private User assignedTo;

    private String chorename;
    private boolean rotate;
    private int frequency;
    private Date duedate;
    private boolean isComplete;
}
