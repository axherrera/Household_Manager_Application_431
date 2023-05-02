package com.cs431.household_manager_application.dto.mapper;
import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.model.User;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {

    @Override
    public UserDTO apply(User user) {
        HouseholdDTOMapper householdDTOMapper = new HouseholdDTOMapper();
        return new UserDTO(
                user.getUserId().toString(),
                user.getUsername(),
                user.getFName(),
                user.getLName(),
                householdDTOMapper.apply(user.getHousehold())
        );
    }
}
