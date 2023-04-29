package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.ShoppingItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingItemRepository extends JpaRepository<ShoppingItem, Long> {
}
