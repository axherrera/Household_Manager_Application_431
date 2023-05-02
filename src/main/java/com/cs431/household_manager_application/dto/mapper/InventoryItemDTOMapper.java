package com.cs431.household_manager_application.dto.mapper;

import com.cs431.household_manager_application.dto.InventoryItemDTO;
import com.cs431.household_manager_application.model.InventoryItem;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class InventoryItemDTOMapper implements Function<InventoryItem, InventoryItemDTO> {
    @Override
    public InventoryItemDTO apply(InventoryItem inventoryItem) {
        return new InventoryItemDTO(
                Long.toString(inventoryItem.getInventoryItemId()),
                inventoryItem.getItem().getName(),
                inventoryItem.getItem().getPrice(),
                inventoryItem.getQuantity(),
                inventoryItem.getExp().toString()
        );
    }
}
