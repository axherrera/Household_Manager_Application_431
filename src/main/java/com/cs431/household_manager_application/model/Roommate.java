package com.cs431.household_manager_application.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Roommate extends User {
    private String firstName;
    private String lastName;
    private Household household;
}
