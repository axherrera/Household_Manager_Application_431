package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.dto.mapper.UserDTOMapper;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.UserRepository;
import com.cs431.household_manager_application.serviceImpl.UserServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class UserServiceTest {

    private AutoCloseable autoCloseable;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserDTOMapper userDTOMapper;

    @InjectMocks
    private UserServiceImpl userService;

    @InjectMocks
    private UserDTO userDTOSample;

    private User testUser;

    @BeforeEach
    public void setUp(){
        autoCloseable = MockitoAnnotations.openMocks(this);
        testUser = new User(
                1L,
                new Household(),
                "testUser",
                "pword",
                "name",
                "name"
        );
    }

    @AfterEach
    public void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    public void canSaveUser() {
        // given
        when(userRepository.save(testUser)).thenReturn(testUser);

        // when
        User result = userService.saveUser(testUser);

        // then
        assertEquals(testUser, result);
        verify(userRepository).save(testUser);
    }

    @Test
    public void canGetAll() {
        // given
        List<User> users = Arrays.asList(testUser, testUser);
        when(userRepository.findAll()).thenReturn(users);

        // when
        List<User> result = userService.getAll();

        // then
        assertEquals(users, result);
        verify(userRepository).findAll();
    }

    @Test
    public void canGetByUsername() {
        // given
        String username = "testUser";
        Optional<User> user = Optional.of(testUser);
        when(userRepository.findByUsername(username)).thenReturn(user);

        // when
        Optional<User> result = userService.getByUsername(username);

        // then
        assertEquals(user, result);
        verify(userRepository).findByUsername(username);
    }

    @Test
    public void canGetByID() {
        // given
        Long id = 1L;
        Optional<User> user = Optional.of(testUser);
        when(userRepository.findByUserId(id)).thenReturn(user);

        // when
        Optional<User> result = userService.getByID(id);

        // then
        assertEquals(user, result);
        verify(userRepository).findByUserId(id);
    }

    @Test
    public void canCheckByUsername() {
        // given
        String username = "testUser";
        when(userRepository.existsByUsername(username)).thenReturn(true);

        // when
        Boolean result = userService.checkByUsername(username);

        // then
        assertTrue(result);
        verify(userRepository).existsByUsername(username);
    }

    @Test
    public void canGetByHousehold() {
        // given
        Long id = 1L;
        List<User> users = Arrays.asList(testUser, testUser);
        when(userRepository.findUsersByHouseholdHouseholdId(id)).thenReturn(Optional.of(users));

        // when
        List<User> result = userService.getByHousehold(id);

        // then
        assertEquals(users, result);
        verify(userRepository).findUsersByHouseholdHouseholdId(id);
    }

    @Test
    public void canGetUserDtoByHousehold() {
        // given
        Long id = 1L;
        List<User> users = Arrays.asList(new User(), new User());
        List<UserDTO> userDTOs = Arrays.asList(userDTOSample, userDTOSample);
        when(userRepository.findUsersByHouseholdHouseholdId(id)).thenReturn(Optional.of(users));
        when(userDTOMapper.apply(any(User.class))).thenReturn(userDTOSample);

        // when
        List<UserDTO> result = userService.getUserDtoByHousehold(id);

        // then
        assertEquals(userDTOs, result);
        verify(userRepository).findUsersByHouseholdHouseholdId(id);
        verify(userDTOMapper, times(2)).apply(any(User.class));
    }

}

