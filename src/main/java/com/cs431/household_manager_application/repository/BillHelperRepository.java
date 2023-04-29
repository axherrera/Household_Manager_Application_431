package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.BillHelper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillHelperRepository extends JpaRepository<BillHelper, Long> {
}
