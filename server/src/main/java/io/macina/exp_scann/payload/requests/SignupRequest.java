package io.macina.exp_scann.payload.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

    @NotBlank(message = "Username is required")
    private String username;
    private String firstname;
    private String lastname;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    private LocalDate birthdate;

    @NotBlank(message = "Password is required")
    private String password;

}


