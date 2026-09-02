package com.shinepublicschool.rest;

import com.shinepublicschool.model.Timetable;
import com.shinepublicschool.repository.TimetableRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/timetable")
public class TimetableRestController {

    @Autowired
    private TimetableRepository timetableRepository;

    @GetMapping
    public ResponseEntity<List<Timetable>> getAllTimetables() {
        return ResponseEntity.ok(timetableRepository.findAll());
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Timetable>> getTimetableByClass(@PathVariable Integer classId) {
        return ResponseEntity.ok(timetableRepository.findByClassId(classId));
    }

    @GetMapping("/teacher/{teacherName}")
    public ResponseEntity<List<Timetable>> getTimetableByTeacher(@PathVariable String teacherName) {
        return ResponseEntity.ok(timetableRepository.findByTeacherName(teacherName));
    }

    @PostMapping
    public ResponseEntity<?> createTimetableSlot(@RequestBody Timetable timetable) {
        Timetable saved = timetableRepository.save(timetable);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTimetableSlot(@PathVariable int id) {
        if (!timetableRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        timetableRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Timetable entry deleted"));
    }
}
