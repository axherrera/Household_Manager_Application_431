package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.ChoreDTO;
import com.cs431.household_manager_application.dto.mapper.ChoreDTOMapper;
import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.ChoreRepository;
import com.cs431.household_manager_application.serviceImpl.ChoreServiceImpl;
import lombok.SneakyThrows;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class ChoreServiceTest {

    private AutoCloseable autoCloseable;

    @Mock
    ChoreRepository choreRepository;

    @Mock
    HouseholdService householdService;

    @Mock
    UserService userService;

    @Mock
    private ChoreDTOMapper choreDTOMapper;

    @InjectMocks
    ChoreServiceImpl choreService;

    ChoreDTO choreDTO;
    Chore choreRequest;
    Chore choreResult;
    User assignedUser;
    Household household;
    Date dueDate;
    SimpleDateFormat formatter;

    @SneakyThrows
    @BeforeEach
    public void setup() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        choreService = new ChoreServiceImpl(choreRepository, householdService, userService);
        formatter = new SimpleDateFormat("yyyy-MM-dd");
        dueDate = formatter.parse("2022-01-01");
        household = new Household(
                1L,
                "household"
        );
        choreDTO = new ChoreDTO(
                "1",
                "1",
                "1",
                "choreName",
                "2022-01-01",
                false
        );
        assignedUser = new User(
                1l,
                household,
                "username",
                "password",
                "fname",
                "lname"
        );
        choreRequest = new Chore(
                assignedUser,
                household,
                "choreName",
                dueDate,
                false
        );
        choreResult = new Chore(
                1L,
                assignedUser,
                household,
                "choreName",
                dueDate,
                false
        );
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    public void canSaveChore() {
        when(userService.getByID(Long.valueOf(choreDTO.assignedTo()))).thenReturn(Optional.of(assignedUser));
        when(householdService.getByID(Long.valueOf(choreDTO.household()))).thenReturn(Optional.of(household));
        when(choreRepository.save(choreRequest)).thenReturn(choreResult);

        Chore savedChore = choreService.saveChore(choreDTO);
        assertEquals(savedChore, choreResult);
        verify(choreRepository, times(1)).save(choreRequest);

    }

    @Test
    void canGetAllChores() {
        Long householdId = 1L;

        when(householdService.getByID(householdId)).thenReturn(Optional.of(household));
        when(choreRepository.findChoresByHousehold(household)).thenReturn(List.of(
                new Chore(1L, assignedUser, household, "Clean the kitchen", dueDate, false),
                new Chore(2L, assignedUser, household, "Do laundry", dueDate, false)
        ));

        List<ChoreDTO> allChores = choreService.getAllChores(householdId);
        assertNotNull(allChores);
        assertEquals(2, allChores.size());
    }

    @Test
    public void canGetChore(){
        when(choreRepository.findById(anyLong())).thenReturn(Optional.of(choreResult));

        ChoreDTO resultChoreDTO = choreService.getChore(1L);

        assertNotNull(resultChoreDTO);
        assertEquals(choreResult.getChoreName(), resultChoreDTO.choreName());
        assertEquals(choreResult.getAssignedTo().getUserId().toString(), resultChoreDTO.assignedTo());
        assertEquals(choreResult.getHousehold().getHouseholdId().toString(), resultChoreDTO.household());
        assertEquals(choreResult.getDueDate().toString(), resultChoreDTO.dueDate());
        assertEquals(choreResult.isComplete(), resultChoreDTO.isComplete());

        verify(choreRepository, times(1)).findById(anyLong());
    }

    @Test
    public void testEditChore() throws ParseException {
        when(choreRepository.findById(1L)).thenReturn(Optional.of(choreResult));
        when(userService.getByID(1L)).thenReturn(Optional.of(assignedUser));
        when(householdService.getByID(1L)).thenReturn(Optional.of(household));
        when(choreRepository.save(new Chore(
                1L,
                assignedUser,
                household,
                "Wash Dishes",
                dueDate,
                true
        ))).thenReturn(
                new Chore(
                        assignedUser,
                        household,
                        "Wash Dishes",
                        dueDate,
                        true
        ));

        ChoreDTO updatedChoreDTO = new ChoreDTO("1", "1", "1", "Wash dishes", "2023-06-02", true);
        ChoreDTO result = choreService.editChore(1L, updatedChoreDTO);

        assertEquals(updatedChoreDTO, result);
        assertEquals(choreDTO.assignedTo(), result.assignedTo());
        assertEquals(formatter.parse(updatedChoreDTO.dueDate()), formatter.parse(result.dueDate()));
        assertEquals(updatedChoreDTO.choreName(), result.choreName());
        assertEquals(updatedChoreDTO.isComplete(), result.isComplete());
    }

    @Test
    public void canDeleteChore() {
        when(choreRepository.existsById(1L)).thenReturn(true);
        assertEquals(true, choreService.deleteChore(1L));
    }

    @Test
    public void canNotDeleteChore() {
        when(choreRepository.existsById(2L)).thenReturn(false);
        assertEquals(false, choreService.deleteChore(1L));
    }

    @Test
    public void canMarkAsComplete(){
        when(choreRepository.findById(1L)).thenReturn(Optional.of(choreResult));
        when(choreRepository.save(choreRequest)).thenReturn(choreResult);

        ChoreDTO updatedChoreDTO = new ChoreDTO("1L", "1L", "1L",  "Wash dishes","2022-01-01",true);
        ChoreDTO result = choreService.markAsCompleted(1L, updatedChoreDTO);

        assertEquals(updatedChoreDTO, result);
        assertEquals(updatedChoreDTO.isComplete(), choreResult.isComplete());
    }

}