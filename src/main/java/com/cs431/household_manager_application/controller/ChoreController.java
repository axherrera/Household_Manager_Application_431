package com.cs431.household_manager_application.controller;
import com.cs431.household_manager_application.dto.BillDTO;
import com.cs431.household_manager_application.dto.ChoreDTO;
import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.service.ChoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/households/{id}")
public class ChoreController {

    private final ChoreService choreService;

    public ChoreController(ChoreService choreService) {
        this.choreService = choreService;
    }


    @GetMapping("/chores")
    List<ChoreDTO> getChores(@PathVariable Long id){
        return choreService.getAllChores(id);
    }

    @PostMapping("/chores")
    Chore newChore(@RequestBody ChoreDTO newChore) {
        return choreService.saveChore(newChore);
    }
    @DeleteMapping("/chores/{choreID}")
    Boolean deleteChore(@PathVariable Long choreId) {
        return choreService.deleteChore(choreId);
    }

    @PutMapping("/chores/{choreId}")
    ChoreDTO editChore(@PathVariable Long choreId, @RequestBody ChoreDTO newChore) {
        return choreService.editChore(choreId, newChore);
    }

    @PatchMapping("/chores/{choreId}")
    ChoreDTO markAsCompleted(@PathVariable Long choreId, @RequestBody ChoreDTO chore) {
        return choreService.markAsCompleted(choreId, chore);
    }
    @GetMapping("/chores/{choreId}")
    ChoreDTO getChorebyId(@PathVariable Long choreId) {
        return choreService.getChore(choreId);
    }

}
