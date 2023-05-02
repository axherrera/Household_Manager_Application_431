package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.BillHelperDTO;
import com.cs431.household_manager_application.model.BillHelper;

import java.util.List;

public interface BillHelperService {
    void deleteList(List<BillHelper> billHelpers);
    BillHelperDTO payBill(Long billId, BillHelperDTO billHelper);
}
