package com.cs431.household_manager_application.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "bill_helper")
public class BillHelper {

    @Id
    @Column(name = "bill_helper_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long billHelperId;

    @ManyToOne(cascade = CascadeType.ALL)
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

//    public static List<BillHelper> createBillHelperList(List<BillHelperDTO> billHelperDTOs, UserService userService){
//        ArrayList<BillHelper> bills = new ArrayList<>();
//        for(BillHelperDTO b : billHelperDTOs){
//             bills.add(new BillHelper(userService.getByID(Long.valueOf(b.id())).get(), b.amountOwed(), b.isPaid()));
//        }
//        return bills;
//    }
}
