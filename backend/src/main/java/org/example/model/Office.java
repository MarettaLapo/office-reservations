package org.example.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@Table(name = "office")
public class Office {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    @Column(name = "start_date")
    private LocalDate startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "number")
    private Integer number;

    @Column(name = "is_free")
    private Boolean isFree;

    @Column(name = "area")
    private Integer area;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "mime_type")
    private String memeType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "floor_id")
    private Floor floor;

    @OneToOne
    @JoinColumn(name = "office_detail_id")
    private OfficeDetail officeDetail;

}
