package org.example.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class CheckNewApplicationRequest {
    List<Long> idApplication;
}
