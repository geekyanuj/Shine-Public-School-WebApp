package com.shinepublicschool.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "notices")
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "target_role", nullable = false)
    private String targetRole; // ALL, STUDENT, TEACHER, ADMIN

    @Column(name = "posted_date", nullable = false)
    private LocalDate postedDate;

    @Column(nullable = false)
    private String priority; // HIGH, MEDIUM, LOW

    private String category; // Academic, Event, Holiday, General
}
