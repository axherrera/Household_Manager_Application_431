package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.dto.mapper.UserDTOMapper;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.UserRepository;
import com.cs431.household_manager_application.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

    public UserServiceImpl(UserRepository userRepository, UserDTOMapper userDTOMapper) {
        this.userRepository = userRepository;
        this.userDTOMapper = userDTOMapper;
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

    @Override
    public List<User> getByHousehold(Long id) {
        return userRepository.findUsersByHouseholdHouseholdId(id).orElseThrow();
    }

    @Override
    public List<UserDTO> getUserDtoByHousehold(Long id){
        return this.getByHousehold(id).stream().map(userDTOMapper).collect(Collectors.toList());
    }


}
