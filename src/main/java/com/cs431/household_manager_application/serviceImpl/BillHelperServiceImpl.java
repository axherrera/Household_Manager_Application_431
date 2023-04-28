package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.model.BillHelper;
import com.cs431.household_manager_application.repository.BillHelperRepository;
import com.cs431.household_manager_application.service.BillHelperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BillHelperServiceImpl implements BillHelperService {

    private final BillHelperRepository billHelperRepository;

    @Override
    public void deleteList(List<BillHelper> billHelpers) {
        billHelperRepository.deleteAllByIdInBatch(billHelpers.stream().map(BillHelper::getBillHelperId).toList());
    }
}
