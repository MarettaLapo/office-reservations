package org.example.model;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OfficeResponse {
    private Long officeId;
    private Integer number;
    private Boolean status;
    private Integer area;
}
