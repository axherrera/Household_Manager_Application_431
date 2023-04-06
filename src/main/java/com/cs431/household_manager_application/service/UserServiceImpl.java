package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private HouseholdService householdService;

    private Household h;


    public UserServiceImpl(
            UserRepository userRepository,
            HouseholdService householdService
    ){
        if(userRepository == null || householdService == null)
            throw new NullPointerException("services");
        this.userRepository = userRepository;
        this.householdService = householdService;
    }



    @Override
    public User saveUser(User user){
        return userRepository.save(user);
    }

    @Override
    public List<User> getAll(){
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getByUsername(String username) {
        return userRepository.findByUserName(username);
    }

    @Override
    public Optional<User> getByID(Long ID) {
        return userRepository.findByUserId(ID);
    }


}
