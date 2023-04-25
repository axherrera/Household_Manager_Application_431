package com.cs431.household_manager_application.controller;

import com.cs431.household_manager_application.dto.UserLoginDTO;
import com.cs431.household_manager_application.dto.RegistrationDTO;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.service.LoginService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingPageController {

    private final LoginService loginService;

    public GreetingPageController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    User login (@RequestBody UserLoginDTO userLoginDTO){
        return loginService.login(userLoginDTO);
    }

    @PostMapping("/register")
    User register (@RequestBody RegistrationDTO registrationDTO){
        return loginService.register(registrationDTO);
    }
}
