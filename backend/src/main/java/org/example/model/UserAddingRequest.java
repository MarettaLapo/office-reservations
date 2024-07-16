package org.example.model;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserAddingRequest {
    private Long userId;
    private Long officeId;
    private LocalDate endDate;
}
