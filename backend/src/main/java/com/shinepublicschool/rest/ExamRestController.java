package com.shinepublicschool.rest;

import com.shinepublicschool.model.Exam;
import com.shinepublicschool.model.ExamResult;
import com.shinepublicschool.repository.ExamRepository;
import com.shinepublicschool.repository.ExamResultRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/exams")
public class ExamRestController {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private ExamResultRepository examResultRepository;

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(examRepository.findAll());
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Exam>> getExamsByClass(@PathVariable Integer classId) {
        return ResponseEntity.ok(examRepository.findByClassId(classId));
    }

    @PostMapping
    public ResponseEntity<?> createExam(@RequestBody Exam exam) {
        Exam saved = examRepository.save(exam);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable int id) {
        if (!examRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        examRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Exam deleted successfully"));
    }

    @GetMapping("/results/exam/{examId}")
    public ResponseEntity<List<ExamResult>> getResultsForExam(@PathVariable int examId) {
        return ResponseEntity.ok(examResultRepository.findByExamId(examId));
    }

    @GetMapping("/results/student/{personId}")
    public ResponseEntity<List<ExamResult>> getReportCardForStudent(@PathVariable int personId) {
        return ResponseEntity.ok(examResultRepository.findByPersonId(personId));
    }

    @PostMapping("/results")
    public ResponseEntity<?> submitExamResults(@RequestBody List<ExamResult> results) {
        if (results == null || results.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Results list cannot be empty"));
        }
        List<ExamResult> saved = examResultRepository.saveAll(results);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Exam results saved successfully",
                "count", saved.size()
        ));
    }
}
