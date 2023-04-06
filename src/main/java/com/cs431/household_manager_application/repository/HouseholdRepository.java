package com.cs431.household_manager_application.repository;

import com.cs431.household_manager_application.model.Household;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseholdRepository extends JpaRepository<Household, Long>
{

}
