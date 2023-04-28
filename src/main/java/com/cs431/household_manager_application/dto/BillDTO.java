package com.cs431.household_manager_application.dto;

import com.cs431.household_manager_application.model.BillHelper;

import java.util.List;

public record BillDTO(
        String id,
        String household,
        String name,
        String type,
        Double total,
        String notes,
        String frequency,
        String date,
        List<BillHelperDTO> BillHelpers
){
}
