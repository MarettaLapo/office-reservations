package org.example.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class OfficesQueryRequest {
    private Integer minSockets;
    private Integer minWindows;
    private Integer minArea;
    private Boolean isSun;
    private Boolean isInternet;
    private Boolean isFree;
    private String sort;
    private String dir;
}
