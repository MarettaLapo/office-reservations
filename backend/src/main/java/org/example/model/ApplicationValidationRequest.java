package org.example.model;

import lombok.Getter;

import javax.validation.constraints.Pattern;

@Getter
public class ApplicationValidationRequest {
    @Pattern(regexp = "[а-яА-Я\\s]+", message = "fio.Поле должно содержать только буквы русского алфавита")
    private String fio;

    @Pattern(regexp = "^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$",
            message = "telephone.Некорректный ввод номера телефона")
    private String telephoneNumber;

    private Integer numberOffice;
}
