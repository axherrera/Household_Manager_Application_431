package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.ChoreRepository;

import java.util.List;
import java.util.Optional;

public class ChoreServiceImpl implements ChoreService {

    private final ChoreRepository choreRepository;

    public ChoreServiceImpl(ChoreRepository choreRepository) {
        this.choreRepository = choreRepository;
    }

    //METHODS

    @Override
    public Chore saveChore(Chore chore) {
        return choreRepository.save(chore);
    }

    @Override
    public List<Chore> getAllChores() {
        return choreRepository.findAll();
    }

    @Override
    public List<Chore> getUserChores(User user) {
        Optional<List<Chore>> chorelist = choreRepository.findByAssignedTo(user);
        return chorelist.orElse(null);

    }

    @Override
    public List<Chore> rotateChores() {
        return null;
    }

    @Override
    public List<Chore> checkExpiration() {
        return null;
    }
}
