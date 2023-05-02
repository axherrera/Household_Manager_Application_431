package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.dto.InventoryItemDTO;
import com.cs431.household_manager_application.dto.mapper.InventoryItemDTOMapper;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.InventoryItem;
import com.cs431.household_manager_application.model.Item;
import com.cs431.household_manager_application.repository.InventoryItemRepository;
import com.cs431.household_manager_application.service.HouseholdService;
import com.cs431.household_manager_application.service.InventoryItemService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class InventoryItemServiceImpl implements InventoryItemService {

    private final InventoryItemRepository inventoryItemRepository;
    private final HouseholdService householdService;
    private final InventoryItemDTOMapper inventoryItemDTOMapper;
    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);


    @Override
    public List<InventoryItemDTO> getItemDTOByHousehold(Long id) {
        Household household = householdService.getByID(id).orElseThrow();
        return this.getItemsByHousehold(household)
                .stream()
                .map(inventoryItemDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryItem> getItemsByHousehold(Household household) {
        return inventoryItemRepository.getByHousehold(household).orElseThrow();
    }

    @SneakyThrows
    @Override
    public InventoryItemDTO addInventoryItem(InventoryItemDTO newItem, Long householdId) {
        return inventoryItemDTOMapper.apply(
                inventoryItemRepository.save(
                        new InventoryItem(
                                new Item(
                                        newItem.itemName(),
                                        newItem.itemCost()
                                ),
                                householdService.getByID(householdId).orElseThrow(),
                                formatter.parse(newItem.exp()),
                                newItem.quantity()
                        )
                )
        );
    }

    @SneakyThrows
    @Override
    public InventoryItemDTO editItem(Long itemId, Long householdId, InventoryItemDTO editedItem) {
        return inventoryItemDTOMapper.apply(
                inventoryItemRepository.save(
                        new InventoryItem(
                                itemId,
                                new Item(
                                        editedItem.itemName(),
                                        editedItem.itemCost()
                                ),
                                householdService.getByID(householdId).orElseThrow(),
                                formatter.parse(editedItem.exp()),
                                editedItem.quantity()
                        )
                )
        );
    }

    @Override
    public boolean deleteItem(Long itemId) {
        if(!inventoryItemRepository.existsById(itemId))
            return false;
        inventoryItemRepository.deleteById(itemId);
        return true;
    }


}
