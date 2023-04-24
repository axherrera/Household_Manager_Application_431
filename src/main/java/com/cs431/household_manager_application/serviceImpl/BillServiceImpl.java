package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.model.Bills;
import com.cs431.household_manager_application.repository.BillHelperRepository;
import com.cs431.household_manager_application.repository.BillsRepository;
import com.cs431.household_manager_application.service.BillService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    private final BillsRepository billRepo;
    private final BillHelperRepository billHelperRepo;
    public BillServiceImpl(BillsRepository billRepo, BillHelperRepository billHelperRepo) {
        this.billRepo = billRepo;
        this.billHelperRepo = billHelperRepo;
    }

    @Override
    public Bills saveBill(Bills bill) {
        return billRepo.save(bill);
    }

    @Override
    public List<Bills> getAllBills() {
        return billRepo.findAll();
    }
}
