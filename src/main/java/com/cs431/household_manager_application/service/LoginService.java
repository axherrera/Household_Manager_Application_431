package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.dto.UserLoginDTO;
import com.cs431.household_manager_application.dto.RegistrationDTO;

public interface LoginService {

    UserDTO login(UserLoginDTO userLoginDTO);
    UserDTO register(RegistrationDTO registrationDTO);
}
