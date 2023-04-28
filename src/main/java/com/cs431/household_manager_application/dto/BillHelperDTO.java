package com.cs431.household_manager_application.dto;

public record BillHelperDTO(
        String id,
        Double amountOwed,
        boolean isPaid
) {
}
