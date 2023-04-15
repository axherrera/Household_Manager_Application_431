package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;

import java.util.List;
import java.util.Optional;

public interface HouseholdService {
    Household saveHousehold (Household household);
    List<Household> getAll();
    Optional<Household> getByID(Long ID);
    Boolean checkById(Long id);
}
