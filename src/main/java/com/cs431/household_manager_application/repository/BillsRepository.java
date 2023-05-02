package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.Bill;
import com.cs431.household_manager_application.model.Household;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillsRepository extends JpaRepository<Bill, Long> {
    List<Bill> findBillByHousehold(Household household);
}
