package com.cs431.household_manager_application.dto.mapper;

import com.cs431.household_manager_application.dto.ChoreDTO;
import com.cs431.household_manager_application.model.Chore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChoreDTOMapper implements Function<Chore, ChoreDTO> {
    @Override
    public ChoreDTO apply(Chore chore) {
        return new ChoreDTO(
                chore.getChoreId().toString(),
                chore.getHousehold().getHouseholdId().toString(),
                chore.getChoreName(),
                chore.getDueDate().toString(),
                chore.getAssignedTo().getUserId().toString(),
                chore.isComplete()
        );
    }
}
