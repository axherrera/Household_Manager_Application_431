package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.HouseholdDTO;
import com.cs431.household_manager_application.dto.UserDTO;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.repository.HouseholdRepository;
import com.cs431.household_manager_application.serviceImpl.HouseholdServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class HouseholdServiceTest {

    private HouseholdService underTest;
    private AutoCloseable autoCloseable;
    private Household household;
    @Mock
    private HouseholdRepository householdRepository;
    @Mock
    private UserService userService;
    @InjectMocks
    private HouseholdServiceImpl householdService;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new HouseholdServiceImpl(householdRepository, userService);
        household = new Household();
        household.setHouseholdId(1L);
        household.setHouseholdName("Test Household");
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }


    @Test
    void canSaveHousehold() {
        when(householdRepository.save(household)).thenReturn(household);
        assertEquals(household, underTest.saveHousehold(household));
        verify(householdRepository, times(1)).save(household);
    }

    @Test
    void canGetAll() {
        List<Household> households = new ArrayList<>();
        households.add(household);
        when(householdRepository.findAll()).thenReturn(households);
        assertEquals(households, householdService.getAll());
        verify(householdRepository, times(1)).findAll();
    }

    @Test
    void canGetByID() {
        when(householdRepository.findByHouseholdId(1L)).thenReturn(Optional.of(household));
        assertEquals(Optional.of(household), householdService.getByID(1L));
        verify(householdRepository, times(1)).findByHouseholdId(1L);
    }

    @Test
    void canCheckById() {
        when(householdRepository.existsById(1L)).thenReturn(true);
        assertTrue(householdService.checkById(1L));
        verify(householdRepository, times(1)).existsById(1L);
    }

    @Test
    void getUsersFromHouse() {
        List<UserDTO> users = new ArrayList<>();
        HouseholdDTO householdDTO = new HouseholdDTO(
                "1L",
                "householdName"
        );
        UserDTO user1 = new UserDTO(
                "1L",
                "username",
                "firstName",
                "lastName",
                householdDTO
        );
        UserDTO user2 = new UserDTO(
                "1L",
                "username2",
                "firstName2",
                "lastName2",
                householdDTO
        );
        users.add(user1);
        users.add(user2);
        when(userService.getUserDtoByHousehold(1L)).thenReturn(users);
        assertEquals(users, householdService.getUsersFromHouse(1L));
        verify(userService, times(1)).getUserDtoByHousehold(1L);
    }
}