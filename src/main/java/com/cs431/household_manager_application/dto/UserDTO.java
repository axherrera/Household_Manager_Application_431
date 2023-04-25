package com.cs431.household_manager_application.dto;

public record UserDTO (
        String userId,
        String username,
        String fName,
        String lName,
        HouseholdDTO household
    ) {
}
