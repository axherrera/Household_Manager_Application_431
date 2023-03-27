package com.cs431.household_manager_application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
//@RestController
public class HouseholdManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HouseholdManagerApplication.class, args);
	}

}
