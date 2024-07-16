package org.example.model;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@ToString
public class SignupRequest {
    private String username;
    private String password;

    @Pattern(regexp = "[а-яА-Я\\s]+", message = "firstName.Поле должно содержать только буквы русского алфавита")
    private String firstName;

    @Pattern(regexp = "[а-яА-Я\\s]+", message = "lastName.Поле должно содержать только буквы русского алфавита")
    private String lastName;

    @Pattern(regexp = "[а-яА-Я\\s]+", message = "patronymic.Поле должно содержать только буквы русского алфавита")
    private String patronymic;

    @Pattern(regexp = "^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$",
            message = "telephoneNumber.Некорректный ввод номера телефона")
    private String telephoneNumber;

    @Email(message = "email.Некорректный ввод электронной почты")
    private String email;
}

