package com.shinepublicschool.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "fee_structure")
public class FeeStructure extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feeStructureId;

    @Column(name = "class_id", nullable = false)
    private Integer classId;

    @Column(name = "fee_type", nullable = false)
    private String feeType; // Tuition, Examination, Transport, Admission, Library

    @Column(nullable = false)
    private Double amount;

    @Column(name = "due_date")
    private LocalDate dueDate;

    private String description;
}
