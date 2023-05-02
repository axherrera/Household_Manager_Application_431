package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.dto.ChoreDTO;
import com.cs431.household_manager_application.dto.mapper.ChoreDTOMapper;
import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.repository.ChoreRepository;
import com.cs431.household_manager_application.service.ChoreService;
import com.cs431.household_manager_application.service.HouseholdService;
import com.cs431.household_manager_application.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class ChoreServiceImpl implements ChoreService {

    private final ChoreRepository choreRepository;
    private final HouseholdService householdService;
    private final UserService userService;
    private final ChoreDTOMapper choreDTOMapper = new ChoreDTOMapper();
    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    @SneakyThrows
    @Override
    public Chore saveChore(ChoreDTO choreDTO) {
        Chore chore = new Chore(
                userService.getByID(Long.valueOf(choreDTO.assignedTo())).get(),
                householdService.getByID(Long.valueOf(choreDTO.household())).get(),
                choreDTO.choreName(),
                formatter.parse(choreDTO.dueDate()),
                choreDTO.isComplete()
        );
        return choreRepository.save(chore);
    }

    @Override
    public List<ChoreDTO> getAllChores(Long id) {
        List<Chore> allChores = choreRepository.findChoresByHousehold(householdService.getByID(id).orElseThrow());
        return allChores.stream().map(choreDTOMapper).collect(Collectors.toList());
    }
    @Override
    public ChoreDTO getChore(Long choreId) {
        return choreRepository.findById(choreId).map(choreDTOMapper).orElseThrow();
    }


    @Override
    public Boolean deleteChore(Long id) {
        if (!choreRepository.existsById(id)) return false;
        choreRepository.deleteById(id);
        return true;
    }

    @SneakyThrows
    @Override
    public ChoreDTO editChore(Long choreId, ChoreDTO chore) {
        Chore choreToChange = choreRepository.findById(choreId).orElseThrow(() -> new RuntimeException("Chore " + choreId + " not found"));
        choreToChange.setChoreName(chore.choreName());
        choreToChange.setComplete(chore.isComplete());
        choreToChange.setAssignedTo(userService.getByID(Long.valueOf(chore.assignedTo())).get());
        choreToChange.setDueDate(formatter.parse(chore.dueDate()));
        choreRepository.save(choreToChange);
        return chore;
    }

    @Override
    public ChoreDTO markAsCompleted(Long choreId, ChoreDTO chore) {

        Chore choreToMark = choreRepository.findById(choreId).orElseThrow(() -> new RuntimeException("Chore " + choreId + " not found"));

        choreToMark.setComplete(chore.isComplete());
        choreRepository.save(choreToMark);
        return chore;
    }



}
