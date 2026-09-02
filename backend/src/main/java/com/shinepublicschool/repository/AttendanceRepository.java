package com.shinepublicschool.repository;

import com.shinepublicschool.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    List<Attendance> findByClassIdAndAttendanceDate(Integer classId, LocalDate attendanceDate);
    List<Attendance> findByPersonId(int personId);
    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);
}
