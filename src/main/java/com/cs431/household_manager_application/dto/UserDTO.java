package com.cs431.household_manager_application.dto;
import com.cs431.household_manager_application.model.Household;

public record UserDTO (
        Household household,
        String username,
        String fName,
        String lName
    ) {
}
