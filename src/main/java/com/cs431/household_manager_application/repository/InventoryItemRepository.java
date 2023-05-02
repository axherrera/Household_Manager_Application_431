package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
    Optional<List<InventoryItem>> getByHousehold(Household household);
}
