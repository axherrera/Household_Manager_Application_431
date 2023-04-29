package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bills")

public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id")
    private Long billID;

    @ManyToOne()
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;

    private String billname;

    private String type;

    private Double total;

    private String notes;

    private String frequency;

    private Date date;

    @OneToMany(targetEntity = BillHelper.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "bill_fk", referencedColumnName = "bill_id")
    private List<BillHelper> BillHelpers;

    public Bill(Household household, String billname, String type, Double total, String notes, String frequency, Date date, List<BillHelper> billHelpers) {
        this.household = household;
        this.billname = billname;
        this.type = type;
        this.total = total;
        this.notes = notes;
        this.frequency = frequency;
        this.date = date;
        BillHelpers = billHelpers;
    }

//    public List<BillDTO> createBillDTOs(){
//        List<BillHelperDTO> bhdto = this.BillHelpers.stream().map()
//        new BillDTO(
//                this.billID,
//                this.household,
//                this.billname,
//                this.type,
//                this.total,
//                this.notes,
//                this.frequency,
//                this.date,
//
//
//        )
//    }

}
