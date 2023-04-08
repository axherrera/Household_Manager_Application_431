package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;

import java.util.List;
import java.util.Optional;

public interface HouseholdService {
    public Household saveHousehold (Household household);
    public List<Household> getAll();
    public Household addRoomate(Household h, User user);
    public Optional<Household> getByID(Long ID);
}
