package com.shinepublicschool.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "attendance")
public class Attendance extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int attendanceId;

    @Column(name = "person_id", nullable = false)
    private int personId;

    @Column(name = "person_name")
    private String personName;

    @Column(name = "class_id")
    private Integer classId;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(nullable = false, length = 20)
    private String status; // PRESENT, ABSENT, LATE, EXCUSED

    private String remarks;
}
