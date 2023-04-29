package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.ChoreRepository;
import com.cs431.household_manager_application.service.ChoreService;
import com.cs431.household_manager_application.service.HouseholdService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChoreServiceImpl implements ChoreService {

    private final ChoreRepository choreRepository;
    private final HouseholdService householdService;

    public ChoreServiceImpl(ChoreRepository choreRepository, HouseholdService householdService) {
        this.choreRepository = choreRepository;
        this.householdService = householdService;
    }

    @Override
    public Chore saveChore(Chore chore) {
        return choreRepository.save(chore);
    }

    @Override
    public List<Chore> getAllChores(Long id) {
        List<Chore> allChores = choreRepository.findChoresByHousehold(householdService.getByID(id).orElseThrow());
        List<Chore> uncompletedChores = new ArrayList<>();
        for (Chore allChore : allChores) {
            if (!allChore.isComplete()) {
                uncompletedChores.add(allChore);
            }
        }
        return uncompletedChores;
    }

    @Override
    public List<Chore> getUserChores(User user) {
        Optional<List<Chore>> choreList = choreRepository.findByAssignedTo(user);
        return choreList.orElse(null);
    }

    @Override
    public Boolean updateChore(Long choreId, Chore updated) {
        return null;
    }

    @Override
    public Boolean deleteChore(Long id) {
        if (!choreRepository.existsById(id)) return false;
        choreRepository.deleteById(id);
        return true;
    }

    @Override
    public Chore editChore(Long choreId, Chore newChore) {
        if(!choreRepository.existsById(choreId))
            throw new RuntimeException("Chore " + choreId + " not found");

        saveChore(newChore);
        return newChore;
    }

    @Override
    public Boolean markAsCompleted(Long choreId, Chore chore) {
        if (!choreRepository.existsById(choreId))
            throw new RuntimeException("Chore " + choreId + " not found");

        chore.setComplete(true);
        saveChore(chore);
        return true;
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
