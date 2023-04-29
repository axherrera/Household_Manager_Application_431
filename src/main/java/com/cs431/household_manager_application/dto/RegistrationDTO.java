package com.cs431.household_manager_application.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationDTO {
    String username;
    String password;
    String firstName;
    String lastName;
    Long household;
}
