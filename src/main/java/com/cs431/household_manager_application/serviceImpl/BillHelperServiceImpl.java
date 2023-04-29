package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.dto.BillHelperDTO;
import com.cs431.household_manager_application.model.Bill;
import com.cs431.household_manager_application.model.BillHelper;
import com.cs431.household_manager_application.repository.BillHelperRepository;
import com.cs431.household_manager_application.repository.BillsRepository;
import com.cs431.household_manager_application.service.BillHelperService;
import com.cs431.household_manager_application.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BillHelperServiceImpl implements BillHelperService {

    private final BillHelperRepository billHelperRepository;

    private final BillsRepository billsRepository;

    @Override
    public void deleteList(List<BillHelper> billHelpers) {
        billHelperRepository.deleteAllByIdInBatch(billHelpers.stream().map(BillHelper::getBillHelperId).toList());
    }

    public BillHelperDTO payBill(Long billId, BillHelperDTO billPayerDTO) {
        Bill billToPay = billsRepository.findById(billId).orElseThrow(() -> new RuntimeException("Bill " + billId + " not found"));

        BillHelper billPayer = billToPay.getBillHelpers()
                .stream()
                .filter(billHelper -> billHelper.getUser().getUserId() == Long.parseLong(billPayerDTO.id()))
                .findAny()
                .orElseThrow(() -> new RuntimeException("Bill Helper " + billPayerDTO.id() + " not found in this bill"));

        billPayer.setPaid(billPayerDTO.isPaid());

        billHelperRepository.save(billPayer);

        return billPayerDTO;
    }
}
