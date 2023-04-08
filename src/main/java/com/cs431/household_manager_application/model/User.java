package com.cs431.household_manager_application.model;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long userId;

    protected String userName;

    protected String emailAddress;

    protected String password;

    protected String fName;

    protected String lName;

}

