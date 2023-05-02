package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.dto.InventoryItemDTO;
import com.cs431.household_manager_application.service.InventoryItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/household/{id}")
@RestController()
public class InventoryItemController {

    private final InventoryItemService inventoryItemService;

    @GetMapping("/inventoryItems")
    List<InventoryItemDTO> getHouseholdInventory(@PathVariable Long id){
        return inventoryItemService.getItemDTOByHousehold(id);
    }

    @PostMapping("/inventoryItems")
    InventoryItemDTO addInventoryItem(@RequestBody InventoryItemDTO newItem, @PathVariable Long id){
        return inventoryItemService.addInventoryItem(newItem, id);
    }

    @PutMapping("/inventoryItems/{itemId}")
    InventoryItemDTO editInventoryItem(@PathVariable Long itemId, @PathVariable Long id, @RequestBody InventoryItemDTO editedItem){
        return inventoryItemService.editItem(itemId, id, editedItem);
    }

    @DeleteMapping("/inventoryItems/{itemId}")
    boolean deleteInventoryItem(@PathVariable Long itemId){
        return inventoryItemService.deleteItem(itemId);
    }
}
