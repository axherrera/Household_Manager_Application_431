package com.cs431.household_manager_application.dto;

public record InventoryItemDTO (
        String id,
        String itemName,
        double itemCost,
        int quantity,
        String exp
        //photo binary data
){

}
