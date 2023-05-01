package com.cs431.household_manager_application.dto;
public record ChoreDTO(
        String id,
        String assignedTo,
        String household,
        String choreName,
        String dueDate,
        boolean isComplete
){
}
