package com.shinepublicschool.repository;

import com.shinepublicschool.model.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Integer> {
    List<Timetable> findByClassId(Integer classId);
    List<Timetable> findByTeacherName(String teacherName);
}
