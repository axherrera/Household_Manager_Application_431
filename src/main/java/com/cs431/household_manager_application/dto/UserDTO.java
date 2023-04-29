package com.cs431.household_manager_application.dto;

public record UserDTO (
        String id,
        String username,
        String firstName,
        String lastName,
        HouseholdDTO Household
    ) {
}
