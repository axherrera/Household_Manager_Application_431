package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.service.HouseholdService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/households")
public class HouseholdController {

    private final HouseholdService hService;

    public HouseholdController(HouseholdService hService) {
        this.hService = hService;
    }

    @PostMapping("/newHousehold")
    Household newHousehold(@RequestBody Household newHousehold) {

        return hService.saveHousehold(newHousehold);
    }

    @PutMapping("/addToExisting/{householdID}")
    Household existingHousehold(@PathVariable Long householdID, @RequestBody User user) {
        return null;
    }

    @GetMapping()
    List<Household> getHouseholds() {
        return hService.getAll();
    }

}
