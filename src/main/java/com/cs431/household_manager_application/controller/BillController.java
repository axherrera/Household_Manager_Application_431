package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.model.Bills;
import com.cs431.household_manager_application.service.BillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/households/{id}")
public class BillController {
    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @PostMapping()
    Bills newBill(@RequestBody Bills newBill) {
        return billService.saveBill(newBill);
    }

    @GetMapping()
    List<Bills> getAllBills() {
        return billService.getAllBills();
    }



}
