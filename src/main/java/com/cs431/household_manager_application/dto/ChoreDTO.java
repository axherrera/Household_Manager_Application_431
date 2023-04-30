package com.cs431.household_manager_application.dto;
public record ChoreDTO(
        String id,
        String assignedID,
        String choreName,
        String dueDate,
        String household,
        boolean isComplete
){
}
