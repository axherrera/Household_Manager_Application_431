package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Bills;
import com.cs431.household_manager_application.repository.BillHelperRepository;
import com.cs431.household_manager_application.repository.BillsRepository;

import java.util.List;

public interface BillService {

    Bills saveBill(Bills bill);
    List<Bills> getAllBills();

}
