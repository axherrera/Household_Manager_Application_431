package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.repository.HouseholdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HouseholdServiceImpl implements HouseholdService{

    @Autowired
    private HouseholdRepository householdRepository;

    @Override
    public Household saveHousehold(Household household) {
        return householdRepository.save(household);
    }

    @Override
    public List<Household> getAll(){
        return householdRepository.findAll();
    }
}
