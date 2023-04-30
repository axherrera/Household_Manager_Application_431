package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.service.ChoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/households")
public class ChoreController {

    private final ChoreService choreService;

    public ChoreController(ChoreService choreService) {
        this.choreService = choreService;
    }


    @GetMapping("/{id}/chores")
    List<Chore> getChores(@PathVariable Long id){
        return choreService.getAllChores(id);
    }

    @PutMapping("/{id}/chores/{choreId}")
    Boolean updateChore(@PathVariable Long choreId, @RequestBody Chore updated){
        return choreService.updateChore(choreId, updated);
    }

    @DeleteMapping("/chores/{choreID}")
    Boolean deleteChore(@PathVariable Long choreId) {
        return choreService.deleteChore(choreId);
    }

    @PutMapping("/chores/{choreId}")
    Chore editChore(@PathVariable Long choreId, @RequestBody Chore newChore) {
        return choreService.editChore(choreId, newChore);
    }

    @PatchMapping("/chores/{choreId}")
    Boolean markAsCompleted(@PathVariable Long choreId, @RequestBody Chore chore) {
        return choreService.markAsCompleted(choreId, chore);
    }

}
