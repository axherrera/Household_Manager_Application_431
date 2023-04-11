package com.cs431.household_manager_application.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shopping")
public class ShoppingItem {

    @Id
    @GeneratedValue
    @Column( name = "shoppingId")
    private Long shoppingItem;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_item", referencedColumnName = "item_id")
    private Item item;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;


    private int quantity;
    private boolean isBought;
}
