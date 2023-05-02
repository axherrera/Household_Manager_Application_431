package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser (User user);
    List<User> getAll ();
    Optional<User> getByUsername(String Username);
    Optional<User> getByID (Long ID);
    Boolean checkByUsername(String username);
    List<User> getByHousehold(Long id);
    List<UserDTO> getUserDtoByHousehold(Long id);
    }
