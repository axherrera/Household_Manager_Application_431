package com.cs431.household_manager_application.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
@Entity
@Table(name = "bill_helper")
public class BillHelper {

    @Id
    @Column(name = "bill_helper_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long billHelperId;

    @ManyToOne()
    @JoinColumn(name = "fk_user_id", referencedColumnName = ("user_id"))
    @JsonIgnoreProperties({"household", "password", "username", "fname", "lname"})
    private User user;

    private Double amountOwed;
    private boolean isPaid;

    public BillHelper(User user, Double amountOwed, boolean isPaid) {
        this.user = user;
        this.amountOwed = amountOwed;
        this.isPaid = isPaid;
    }
}
