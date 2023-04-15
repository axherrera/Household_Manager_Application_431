package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByUserId(Long id);

    Boolean existsByUsername(String username);
}
