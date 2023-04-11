package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.dto.UserDTOMapper;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private  UserService userService;

    private final UserDTOMapper userDTOMapper;

    public UserController(UserDTOMapper userDTOMapper) {
        this.userDTOMapper = userDTOMapper;
    }

    @PostMapping()
    User newUser(@RequestBody User newUser){

        return userService.saveUser(newUser);
    }

    @GetMapping()
    List<UserDTO> getAllUsers(){
        return userService.getAll().stream()
                .map(userDTOMapper)
                .collect((Collectors.toList()));
    }

    @GetMapping("/{username}")
    Optional<UserDTO> getUserByUsername(@PathVariable String username){
        return userService.getByUsername(username)
                .map(userDTOMapper);
    }

    @GetMapping("/getById/{id}")
    Optional<UserDTO> getUserByID(@PathVariable String id){
        return userService.getByID(Long.valueOf(id))
                .map(userDTOMapper);
    }



}
