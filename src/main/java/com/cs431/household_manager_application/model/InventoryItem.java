package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "inventory")
public class InventoryItem {

    @Id
    @GeneratedValue
    @Column( name = "inventoryId")
    private Long inventoryItem;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_item", referencedColumnName = "item_id")
    private Item item;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;

    private Date exp;
}
