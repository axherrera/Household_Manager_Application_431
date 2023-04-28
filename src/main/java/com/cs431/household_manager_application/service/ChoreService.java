package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.model.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ChoreService {
    Chore saveChore(Chore chore);
    List<Chore> getAllChores(Long id);
    List<Chore> getUserChores(User user);
    List<Chore> rotateChores();
    List<Chore> checkExpiration();
    Boolean updateChore(Long choreId, Chore updated);
    Boolean deleteChore(Long id);
    Chore editChore(Long choreId, Chore newChore);
    Boolean markAsCompleted(Long choreId, Chore chore);
}
