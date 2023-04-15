package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.repository.HouseholdRepository;
import com.cs431.household_manager_application.service.HouseholdService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HouseholdServiceImpl implements HouseholdService {

    private HouseholdRepository householdRepository;
    public HouseholdServiceImpl(HouseholdRepository householdRepository) {
        this.householdRepository = householdRepository;
    }


    //METHODS
    @Override
    public Household saveHousehold(Household household) {
        return householdRepository.save(household);
    }

    @Override
    public List<Household> getAll(){
        return householdRepository.findAll();
    }

    @Override
    public Optional<Household> getByID(Long ID) {
        return householdRepository.findByHouseholdId(ID);
    }

    @Override
    public Boolean checkById(Long id) {
        return householdRepository.existsById(id);
    }


}
