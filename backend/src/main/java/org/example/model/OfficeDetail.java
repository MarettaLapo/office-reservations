package org.example.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@Table(name = "office_detail")
public class OfficeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "windows_count")
    private Integer windowsCount;

    @Column(name = "is_internet")
    private Boolean isInternet;

    @Column(name = "sockets")
    private Integer sockets;

    @Column(name = "is_sun")
    private Boolean isSun;
}
