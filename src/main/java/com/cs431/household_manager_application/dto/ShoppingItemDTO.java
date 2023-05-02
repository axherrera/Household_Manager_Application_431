package com.cs431.household_manager_application.dto;

import lombok.Data;

@Data
public class ShoppingItemDTO {
    private String itemName;
    private Float itemCost;
    private int quantity;
    private boolean isBought;
    //photo binary data
}
