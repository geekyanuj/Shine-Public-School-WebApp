package com.shinepublicschool.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "timetable")
public class Timetable extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int timetableId;

    @Column(name = "class_id", nullable = false)
    private Integer classId;

    @Column(name = "class_name")
    private String className;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "teacher_name")
    private String teacherName;

    @Column(name = "day_of_week", nullable = false)
    private String dayOfWeek; // MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY

    @Column(name = "start_time", nullable = false)
    private String startTime; // e.g. "09:00 AM"

    @Column(name = "end_time", nullable = false)
    private String endTime; // e.g. "09:45 AM"

    @Column(name = "room_number")
    private String roomNumber;
}
