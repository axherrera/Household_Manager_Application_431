package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.UserLoginDTO;
import com.cs431.household_manager_application.dto.RegistrationDTO;
import com.cs431.household_manager_application.model.User;


public interface LoginService {

    User login(UserLoginDTO userLoginDTO);
    User register(RegistrationDTO registrationDTO);
}
