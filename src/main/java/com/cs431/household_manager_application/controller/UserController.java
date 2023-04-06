package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private  UserService userService;

    @PostMapping()
    User newUser(@RequestBody User newUser){
        return userService.saveUser(newUser);
    }

    @GetMapping()
    List<User> getAllUsers(){
        return userService.getAll();
    }

    @GetMapping("/{username}")
    Optional<User> getUserByUsername(@PathVariable String username){
        return userService.getByUsername(username);
    }

    @GetMapping("/getById/{id}")
    Optional<User> getUserByID(@PathVariable String id){
        return userService.getByID(Long.valueOf(id));
    }



}
