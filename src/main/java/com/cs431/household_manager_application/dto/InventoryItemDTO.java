package com.cs431.household_manager_application.dto;

import lombok.Data;

import java.util.Date;

@Data
public class InventoryItemDTO {
    private String itemName;
    private Float itemCost;
    private int quantity;
    private Date exp;
    //photo binary data
}
