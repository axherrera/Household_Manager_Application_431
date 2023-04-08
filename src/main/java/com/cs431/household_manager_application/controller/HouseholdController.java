package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.service.HouseholdService;
import com.cs431.household_manager_application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/households")
public class HouseholdController {

    @Autowired
    private HouseholdService hService;
    @Autowired
    private UserService userService;

    @PostMapping("/newHousehold")
    Household newHousehold(@RequestBody Household newHousehold){
        return hService.saveHousehold(newHousehold);
    }

    @PutMapping("/addToExisting/{householdID}")
    Household existingHousehold(@PathVariable Long householdID, @RequestBody User user){
        Household household = hService.getByID(householdID).get();
        household.getRoommates().add(user);
        return hService.saveHousehold(household);
    }

    @GetMapping()
    List<Household> getHouseholds(){
        return hService.getAll();
    }

//    @PutMapping("/{hID}/addUser/{userID")
//    Household addRoommate(@PathVariable Long hID,
//                           @PathVariable User
//    ){
//        Household h = hService.getByID(hID).get();
//        h.getRoommates().add(u);
//        hService.saveHousehold(h);
//        return h;
//    }

}
