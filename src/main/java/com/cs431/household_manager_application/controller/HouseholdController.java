package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.service.HouseholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/households")
public class HouseholdController {

    @Autowired
    private HouseholdService hService;

    @PostMapping()
    Household newHousehold(@RequestBody Household newHousehold){
        return hService.saveHousehold(newHousehold);
    }

    @GetMapping()
    List<Household> getHouseholds(){
        return hService.getAll();
    }
}
