package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.BillHelperDTO;
import com.cs431.household_manager_application.model.Bill;
import com.cs431.household_manager_application.model.BillHelper;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.BillHelperRepository;
import com.cs431.household_manager_application.repository.BillsRepository;
import com.cs431.household_manager_application.serviceImpl.BillHelperServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.stereotype.Service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BillHelperServiceTest {

    @Mock
    private BillHelperRepository billHelperRepository;

    @Mock
    private BillsRepository billsRepository;

    @InjectMocks
    private BillHelperServiceImpl billHelperService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        billHelperService = new BillHelperServiceImpl(billHelperRepository, billsRepository);
    }

    @Test
    public void canDeleteBillhelpers() {
        List<BillHelper> billHelpers = new ArrayList<>();
        BillHelper billHelper1 = new BillHelper();
        billHelper1.setBillHelperId(1L);
        BillHelper billHelper2 = new BillHelper();
        billHelper2.setBillHelperId(2L);
        billHelpers.add(billHelper1);
        billHelpers.add(billHelper2);

        doNothing().when(billHelperRepository).deleteAllByIdInBatch(anyList());
        billHelperService.deleteList(billHelpers);

        verify(billHelperRepository, times(1)).deleteAllByIdInBatch(anyList());
    }

    @Test
    public void canPayBill() {
        User payer = new User();
        payer.setUserId(1L);
        Long billId = 1L;
        BillHelperDTO billPayerDTO = new BillHelperDTO(
                "1",
                9.99,
                true
        );

        Bill bill = new Bill();
        BillHelper billPayer = new BillHelper(
                payer,
                9.99,
                false
        );
        List<BillHelper> billHelpers = new ArrayList<>();
        billHelpers.add(billPayer);
        bill.setBillHelpers(billHelpers);

        when(billsRepository.findById(billId)).thenReturn(Optional.of(bill));
        when(billHelperRepository.save(any(BillHelper.class))).thenReturn(billPayer);

        BillHelperDTO updatedBillPayerDTO = billHelperService.payBill(billId, billPayerDTO);

        assertEquals(billPayerDTO.id(), updatedBillPayerDTO.id());
        assertEquals(billPayerDTO.isPaid(), updatedBillPayerDTO.isPaid());
        assertTrue(billPayer.isPaid());
        verify(billHelperRepository, times(1)).save(any(BillHelper.class));
    }
}