package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.InventoryItemDTO;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.InventoryItem;

import java.util.List;

public interface InventoryItemService {
    List<InventoryItemDTO> getItemDTOByHousehold(Long id);
    List<InventoryItem>getItemsByHousehold(Household household);

    InventoryItemDTO addInventoryItem(InventoryItemDTO newItem, Long householdId);

    InventoryItemDTO editItem(Long itemId, Long householdId, InventoryItemDTO editedItem);

    boolean deleteItem(Long itemId);
}
