package com.cs431.household_manager_application.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedCredentials extends RuntimeException{
    public UnauthorizedCredentials(String message) {
        super(message);
    }
}
