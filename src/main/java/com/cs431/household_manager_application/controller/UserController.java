package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private  UserService userService;

    @PostMapping("/add")
    User newUser(@RequestBody User newUser){
        return userService.saveUser(newUser);
    }

    @GetMapping("/getAll")
    List<User> getAllUsers(){
        return userService.getAll();
    }

    @GetMapping("/getBy/{username}")
    Optional<User> getUserByUsername(@PathVariable String username){
        return userService.getByUsername(username);
    }



}
