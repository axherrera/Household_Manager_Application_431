package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.UserRepository;
import com.cs431.household_manager_application.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //METHODS

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
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getByID(Long ID) {
        return userRepository.findByUserId(ID);
    }

    @Override
    public Boolean checkByUsername(String username) {
        return userRepository.existsByUsername(username);
    }


}
