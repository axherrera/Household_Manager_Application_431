package com.cs431.household_manager_application.dto.mapper;

import com.cs431.household_manager_application.dto.BillDTO;
import com.cs431.household_manager_application.model.Bill;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class BillDTOMapper implements Function<Bill, BillDTO> {

    @Override
    public BillDTO apply(Bill bill) {
        return new BillDTO(
                bill.getBillID().toString(),
                bill.getHousehold().getHouseholdId().toString(),
                bill.getBillname(),
                bill.getType(),
                bill.getTotal(),
                String.valueOf(bill.getFrequency()),
                bill.getFrequency(),
                bill.getDate().toString(),
                bill.getBillHelpers()
        );
    }
}
