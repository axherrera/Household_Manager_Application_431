package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.BillHelperDTO;

import java.util.List;

public interface BillHelperService {
    void saveList(List<BillHelperDTO> billHelperDTOs);
}
