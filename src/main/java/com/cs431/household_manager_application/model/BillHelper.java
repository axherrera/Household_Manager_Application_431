package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bill_helper")
public class BillHelper {

    @Id
    @Column(name = "bill_helper_id")
    @GeneratedValue
    private Long billHelperId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_bill_id", referencedColumnName = ("bill_id"))
    private Bills bill;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user_id", referencedColumnName = ("user_id"))
    private User user;

    private Double amountOwed;
    private boolean isPaid;
}
