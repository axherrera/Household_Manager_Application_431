package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.dto.BillDTO;
import com.cs431.household_manager_application.model.Bill;
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
    Bill newBill(@RequestBody BillDTO newBill) {
        return billService.saveBill(newBill);
    }

    @GetMapping()
    List<BillDTO> getAllBills(@PathVariable Long id) {
        return billService.getAllHouseholdBills(id);
    }

    @GetMapping("/bills/{billId}")
    BillDTO getBillById(@PathVariable Long billId) {
        return billService.getBill(billId);
    }

    @DeleteMapping ("/bills/{billId}")
    boolean deleteBill(@PathVariable Long billId) {
        return billService.deleteBill(billId);
    }

    @PutMapping("/bills/{billId}")
    BillDTO editBill(@PathVariable Long billId, @RequestBody BillDTO newBill){
        return billService.editBill(billId, newBill);
    }



}
