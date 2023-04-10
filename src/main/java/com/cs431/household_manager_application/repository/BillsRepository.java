package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.Bills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillsRepository extends JpaRepository<Bills, Long> {
}
