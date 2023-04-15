package com.cs431.household_manager_application.model;
import com.cs431.household_manager_application.dto.RegistrationDTO;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    public User(Household household, RegistrationDTO registrationDTO) {
        this.household = household;
        this.username = registrationDTO.getUsername();
        this.password = registrationDTO.getPassword();
        this.fName = registrationDTO.getFname();
        this.lName = registrationDTO.getLname();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_household", referencedColumnName = "household_id")
    private Household household;

    private String username;

    private String password;

    private String fName;

    private String lName;

}

