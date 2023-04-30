package com.cs431.household_manager_application.service;
import com.cs431.household_manager_application.dto.ChoreDTO;
import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.model.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ChoreService {
    Chore saveChore(ChoreDTO choreDTO);
    List<ChoreDTO> getAllChores(Long id);
    ChoreDTO getChore(Long choreId);
    Boolean deleteChore(Long id);
    ChoreDTO editChore(Long choreId, ChoreDTO newChore);
    ChoreDTO markAsCompleted(Long choreId, ChoreDTO chore);
}
