package com.cs431.household_manager_application.dto.mapper;

import com.cs431.household_manager_application.dto.HouseholdDTO;
import com.cs431.household_manager_application.model.Household;

import java.util.function.Function;

public class HouseholdDTOMapper implements Function<Household, HouseholdDTO> {

    @Override
    public HouseholdDTO apply(Household household) {
        return new HouseholdDTO(
                household.getHouseholdId().toString(),
                household.getHouseholdName()
        );

    }
}
