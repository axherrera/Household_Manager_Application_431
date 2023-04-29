package com.cs431.household_manager_application.dto.mapper;

import com.cs431.household_manager_application.dto.BillDTO;
import com.cs431.household_manager_application.model.Bill;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillDTOMapper implements Function<Bill, BillDTO> {

    private final BillHelperDTOMapper billHelperDTOMapper = new BillHelperDTOMapper();
    @Override
    public BillDTO apply(Bill bill) {
        return new BillDTO(
                bill.getBillID().toString(),
                bill.getHousehold().getHouseholdId().toString(),
                bill.getBillname(),
                bill.getType(),
                bill.getTotal(),
                String.valueOf(bill.getNotes()),
                bill.getFrequency(),
                bill.getDate().toString(),
                bill.getBillHelpers().stream().map(billHelperDTOMapper).collect(Collectors.toList())
        );
    }
}
