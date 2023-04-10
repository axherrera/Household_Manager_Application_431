package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bills")


public class Bills {

    @Id
    @Generated
    @Column(name = "bill_id")
    private Long billID;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;

    private String billname;

    private String type;

    private double total;

    private String notes;

    private int frequency;

    private Date date;

    private Boolean isEvenSplit;


}
