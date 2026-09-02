package com.shinepublicschool.rest;

import com.shinepublicschool.model.Attendance;
import com.shinepublicschool.repository.AttendanceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/attendance")
public class AttendanceRestController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return ResponseEntity.ok(attendanceRepository.findAll());
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Attendance>> getAttendanceByClass(
            @PathVariable Integer classId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (date != null) {
            return ResponseEntity.ok(attendanceRepository.findByClassIdAndAttendanceDate(classId, date));
        }
        return ResponseEntity.ok(attendanceRepository.findAll());
    }

    @GetMapping("/student/{personId}")
    public ResponseEntity<List<Attendance>> getStudentAttendance(@PathVariable int personId) {
        return ResponseEntity.ok(attendanceRepository.findByPersonId(personId));
    }

    @PostMapping("/mark")
    public ResponseEntity<?> markBatchAttendance(@RequestBody List<Attendance> attendanceList) {
        if (attendanceList == null || attendanceList.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Attendance list cannot be empty"));
        }
        for (Attendance att : attendanceList) {
            if (att.getAttendanceDate() == null) {
                att.setAttendanceDate(LocalDate.now());
            }
        }
        List<Attendance> saved = attendanceRepository.saveAll(attendanceList);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Attendance marked successfully",
                "count", saved.size()
        ));
    }

    @PostMapping
    public ResponseEntity<?> saveSingleAttendance(@RequestBody Attendance attendance) {
        if (attendance.getAttendanceDate() == null) {
            attendance.setAttendanceDate(LocalDate.now());
        }
        Attendance saved = attendanceRepository.save(attendance);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
