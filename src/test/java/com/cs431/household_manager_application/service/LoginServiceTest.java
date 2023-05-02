package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.HouseholdDTO;
import com.cs431.household_manager_application.dto.RegistrationDTO;
import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.dto.UserLoginDTO;
import com.cs431.household_manager_application.dto.mapper.UserDTOMapper;
import com.cs431.household_manager_application.exceptions.HouseholdNotFoundException;
import com.cs431.household_manager_application.exceptions.UnauthorizedCredentials;
import com.cs431.household_manager_application.exceptions.UserExistsException;
import com.cs431.household_manager_application.exceptions.UserNotFoundException;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.serviceImpl.LoginServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
class LoginServiceTest {

    private AutoCloseable autoCloseable;
    @Mock
    private UserService userService;

    @Mock
    private HouseholdService householdService;

    @Mock
    private UserDTOMapper userDTOMapper;

    @Mock
    private LoginService loginService;

    private UserLoginDTO userLoginDTO;

    private RegistrationDTO registrationDTO;
    private User user;
    private UserDTO userDTO;
    private HouseholdDTO householdDTO;

    @BeforeEach
    public void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        loginService = new LoginServiceImpl(userService, householdService, userDTOMapper);
        householdDTO = new HouseholdDTO(
                "1L",
                "householdName"
        );
        userDTO = new UserDTO(
                "1L",
                "username",
                "fname",
                "lname",
                householdDTO
        );
        user = new User(
                1L,
                new Household(),
                "username",
                "password",
                "fname",
                "lname"

        );
        userLoginDTO = new UserLoginDTO(
                "username",
                "password"
        );
        registrationDTO = new RegistrationDTO(
                "username",
                "password",
                "fname",
                "lname",
                1L
        );

    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    public void canLoginSuccessfully() {
        user.setPassword("password");
        when(userService.getByUsername(userLoginDTO.getUsername())).thenReturn(Optional.of(user));
        when(userDTOMapper.apply(user)).thenReturn(userDTO);
        UserDTO result = loginService.login(userLoginDTO);
        assertEquals(userDTO, result);
    }

    @Test
    public void canThrowUserNotFoundException() {
        when(userService.getByUsername(userLoginDTO.getUsername())).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> loginService.login(userLoginDTO));
    }

    @Test
    public void canThrowUnauthorizedCredentialsException() {
        user.setPassword("different_password");
        when(userService.getByUsername(userLoginDTO.getUsername())).thenReturn(Optional.of(user));
        assertThrows(UnauthorizedCredentials.class, () -> loginService.login(userLoginDTO));
    }

    @Test
    public void canRegisterUserWithNewHousehold() {//new household
        registrationDTO.setHousehold(null);
        Household household = new Household();
        when(userService.checkByUsername(registrationDTO.getUsername())).thenReturn(false);
        when(householdService.saveHousehold(any(Household.class))).thenReturn(household);
        when(userService.saveUser(any(User.class))).thenReturn(user);
        when(userDTOMapper.apply(user)).thenReturn(userDTO);
        UserDTO result = loginService.register(registrationDTO);
        assertEquals(userDTO, result);
    }

    @Test
    public void canThrowUserExistsException() {
        when(userService.checkByUsername(registrationDTO.getUsername())).thenReturn(true);
        assertThrows(UserExistsException.class, () -> loginService.register(registrationDTO));
    }

    @Test
    public void canThrowHouseholdNotFoundException() {//wrong household number
        when(userService.checkByUsername(registrationDTO.getUsername())).thenReturn(false);
        when(householdService.getByID(registrationDTO.getHousehold())).thenReturn(Optional.empty());
        assertThrows(HouseholdNotFoundException.class, () -> loginService.register(registrationDTO));
    }
    @Test
    public void canRegisterToExistingHousehold() {//wrong household number
        when(userService.checkByUsername(registrationDTO.getUsername())).thenReturn(false);
        when(householdService.getByID(registrationDTO.getHousehold())).thenReturn(Optional.of(new Household()));
        when(userService.saveUser(any(User.class))).thenReturn(user);
        when(userDTOMapper.apply(user)).thenReturn(userDTO);
        UserDTO result = loginService.register(registrationDTO);
        assertEquals(userDTO, result);
    }
}