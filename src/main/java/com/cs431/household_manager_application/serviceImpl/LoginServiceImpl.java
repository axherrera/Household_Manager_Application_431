package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.dto.UserLoginDTO;
import com.cs431.household_manager_application.dto.RegistrationDTO;
import com.cs431.household_manager_application.dto.mapper.UserDTOMapper;
import com.cs431.household_manager_application.exceptions.UnauthorizedCredentials;
import com.cs431.household_manager_application.exceptions.UserNotFoundException;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.service.HouseholdService;
import com.cs431.household_manager_application.service.LoginService;
import com.cs431.household_manager_application.service.UserService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.util.Objects.isNull;

@Service
public class LoginServiceImpl implements LoginService {

    private final UserService userService;
    private final HouseholdService householdService;
    private final UserDTOMapper userDTOMapper;

    public LoginServiceImpl(UserService userService, HouseholdService householdService, UserDTOMapper userDTOMapper) {
        this.userService = userService;
        this.householdService = householdService;
        this.userDTOMapper = userDTOMapper;
    }

    @Override
    public UserDTO login(UserLoginDTO userLoginDTO) {
        Optional<User> ou = userService.getByUsername(userLoginDTO.getUsername());
        if(ou.isEmpty())
            throw new UserNotFoundException("User does not exist");
        if(ou.get().getPassword().equals(userLoginDTO.getPassword()))
            return ou.map(userDTOMapper).orElseThrow();
        else
            throw new UnauthorizedCredentials("Login Information Incorrect");
    }

    @Override
    public UserDTO register(RegistrationDTO registrationDTO) {
        if(userService.checkByUsername(registrationDTO.getUsername()))
            throw new DuplicateKeyException("Username Already Taken");
        Household household = isNull(registrationDTO.getHousehold())?
                householdService.saveHousehold(new Household(null, "My Household")):
                householdService.getByID((registrationDTO.getHousehold())).orElse(householdService.saveHousehold(new Household(registrationDTO.getHousehold(), "My Household")));
       return userDTOMapper.apply(userService.saveUser(new User(household, registrationDTO)));
    }


}
