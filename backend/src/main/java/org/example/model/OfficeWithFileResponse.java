package org.example.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class OfficeWithFileResponse {
    private Office office;
    private String file;

    public OfficeWithFileResponse() {
    }

    public OfficeWithFileResponse(Office office, String file) {
        this.office = office;
        this.file = file;
    }
}
