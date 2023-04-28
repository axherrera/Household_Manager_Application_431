package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.service.ChoreService;
import com.cs431.household_manager_application.service.HouseholdService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/households")
public class HouseholdController {

    private final HouseholdService hService;
    private final ChoreService choreService;

    public HouseholdController(HouseholdService hService, ChoreService choreService) {
        this.hService = hService;
        this.choreService = choreService;
    }

    @GetMapping("/{id}/members")
    List<UserDTO> getMembers(@PathVariable Long id){
        return hService.getUsersFromHouse(id);
    }

    @GetMapping()
    List<Household> getHouseholds() {
        return hService.getAll();
    }

    //CHORE METHODS TODO: Add to chore controller @Sarn
    @GetMapping("/{id}/chores")
    List<Chore> getChores(@PathVariable Long id){
        return choreService.getAllChores(id);
    }

    @PutMapping("/{id}/chores/{choreId}")
    Boolean updateChore(@PathVariable Long choreId, @RequestBody Chore updated){
        return choreService.updateChore(choreId, updated);
    }
}
