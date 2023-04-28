package com.cs431.household_manager_application.dto.mapper;

import com.cs431.household_manager_application.dto.BillHelperDTO;
import com.cs431.household_manager_application.model.BillHelper;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@NoArgsConstructor
public class BillHelperDTOMapper implements Function<BillHelper, BillHelperDTO> {

    @Override
    public BillHelperDTO apply(BillHelper billHelper) {
        return new BillHelperDTO(
                billHelper.getUser().getUserId().toString(),
                billHelper.getAmountOwed(),
                billHelper.isPaid()
        );
    }
}
