package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Household;

import java.util.List;

public interface HouseholdService {
    public Household saveHousehold (Household household);
    public List<Household> getAll();
}
