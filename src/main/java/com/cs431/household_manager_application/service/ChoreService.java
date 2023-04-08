package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.model.User;

import java.util.List;

public interface ChoreService {
    public Chore saveChore(Chore chore);
    public List<Chore> getAllChores();
    public List<Chore> getUserChores(User user);
    public List<Chore> rotateChores();
    public List<Chore> checkExpiration();
}
