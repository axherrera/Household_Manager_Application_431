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
    @GeneratedValue(strategy = GenerationType.IDENTITY)    @Column( name = "inventoryId")
    private Long inventoryItemId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_item", referencedColumnName = "item_id")
    private Item item;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;

    private Date exp;
    private int quantity;

    public InventoryItem(Item item, Household household, Date exp, int quantity) {
        this.item = item;
        this.household = household;
        this.exp = exp;
        this.quantity = quantity;
    }
}
