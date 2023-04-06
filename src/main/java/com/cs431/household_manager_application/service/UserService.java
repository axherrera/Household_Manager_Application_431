package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User saveUser (User user);
    public List<User> getAll ();
    public Optional<User> getByUsername(String Username);
    public Optional<User> getByID (Long ID);
}
