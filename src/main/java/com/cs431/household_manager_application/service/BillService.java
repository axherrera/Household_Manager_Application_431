package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.BillDTO;
import com.cs431.household_manager_application.model.Bill;

import java.util.List;

public interface BillService {

    Bill saveBill(BillDTO billDTO);
    List<BillDTO> getAllHouseholdBills(Long id);

}
