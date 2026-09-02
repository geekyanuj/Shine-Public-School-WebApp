package com.shinepublicschool.rest;

import com.shinepublicschool.model.Person;
import com.shinepublicschool.repository.PersonRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/students")
public class StudentRestController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping
    public ResponseEntity<List<Person>> getAllStudents() {
        List<Person> students = personRepository.findAll().stream()
                .filter(p -> p.getRoles() != null && "STUDENT".equalsIgnoreCase(p.getRoles().getRoleName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(students);
    }

    @GetMapping("/class/{classId}")
    public ResponseEntity<List<Person>> getStudentsByClass(@PathVariable int classId) {
        List<Person> students = personRepository.findAll().stream()
                .filter(p -> p.getEClass() != null && p.getEClass().getClassId() == classId)
                .collect(Collectors.toList());
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable int id) {
        Optional<Person> person = personRepository.findById(id);
        if (person.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(person.get());
    }
}
