package com.shinepublicschool.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "exam_result")
public class ExamResult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resultId;

    @Column(name = "exam_id", nullable = false)
    private int examId;

    @Column(name = "person_id", nullable = false)
    private int personId; // student id

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "marks_obtained", nullable = false)
    private Double marksObtained;

    private String grade; // e.g. A+, A, B, C, F

    private String remarks;
}
