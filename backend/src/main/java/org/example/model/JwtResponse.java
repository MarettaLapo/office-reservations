package org.example.model;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String patronymic;
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private List<String> roles;

    public JwtResponse(String token, Long id, String username, String firstName,
                       String lastName, String patronymic,
                       String telephoneNumber, String email,
                       List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
        this.telephoneNumber = telephoneNumber;
        this.email = email;
        this.roles = roles;
    }
}

