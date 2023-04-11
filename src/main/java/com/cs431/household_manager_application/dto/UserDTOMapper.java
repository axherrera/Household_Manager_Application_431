package com.cs431.household_manager_application.dto;
import com.cs431.household_manager_application.model.User;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getHousehold(),
                user.getUserName(),
                user.getEmailAddress(),
                user.getFName(),
                user.getLName()
        );
    }
}
