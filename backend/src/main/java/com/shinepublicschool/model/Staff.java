package com.shinepublicschool.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "staff")
public class Staff extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int staffId;

    @Column(name = "person_id", nullable = false)
    private int personId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(name = "mobile_num")
    private String mobileNum;

    @Column(nullable = false)
    private String designation; // e.g. Senior Teacher, Principal, Admin Staff, Lab Assistant

    @Column(nullable = false)
    private String department; // e.g. Science, Mathematics, English, Administration

    private String qualification;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    private Double salary;

    private String status; // ACTIVE, ON_LEAVE, RESIGNED
}
