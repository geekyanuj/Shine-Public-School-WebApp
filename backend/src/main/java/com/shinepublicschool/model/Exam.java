package com.shinepublicschool.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "exam")
public class Exam extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int examId;

    @Column(name = "exam_name", nullable = false)
    private String examName; // e.g. Midterm 2026, Final Exam

    @Column(name = "class_id", nullable = false)
    private Integer classId;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "exam_date")
    private LocalDate examDate;

    @Column(name = "max_marks", nullable = false)
    private Integer maxMarks;

    @Column(name = "passing_marks", nullable = false)
    private Integer passingMarks;
}
