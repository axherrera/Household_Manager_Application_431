package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.Chore;
import com.cs431.household_manager_application.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChoreRepository extends JpaRepository<Chore, Long>{


    Optional <List<Chore>> findByAssignedTo(User u);
}
