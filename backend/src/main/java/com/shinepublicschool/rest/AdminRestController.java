package com.shinepublicschool.rest;

import com.shinepublicschool.model.EClass;
import com.shinepublicschool.model.Person;
import com.shinepublicschool.model.Subject;
import com.shinepublicschool.repository.EClassRepository;
import com.shinepublicschool.repository.PersonRepository;
import com.shinepublicschool.repository.SubjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminRestController {

    @Autowired private PersonRepository personRepository;
    @Autowired private EClassRepository eClassRepository;
    @Autowired private SubjectRepository subjectRepository;

    // ──────────────────────────────────
    // CLASSES
    // ──────────────────────────────────

    @GetMapping("/classes")
    public ResponseEntity<List<EClass>> getClasses() {
        return ResponseEntity.ok(eClassRepository.findAll());
    }

    @PostMapping("/classes")
    public ResponseEntity<?> addClass(@RequestBody EClass eClass) {
        eClassRepository.save(eClass);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Class added successfully"));
    }

    @DeleteMapping("/classes/{classId}")
    public ResponseEntity<?> deleteClass(@PathVariable int classId) {
        Optional<EClass> eClass = eClassRepository.findById(classId);
        if (eClass.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        // Unassign persons from class before deleting
        for (Person person : eClass.get().getPersons()) {
            person.setEClass(null);
            personRepository.save(person);
        }
        eClassRepository.deleteById(classId);
        return ResponseEntity.ok(Map.of("message", "Class deleted"));
    }

    // ──────────────────────────────────
    // STUDENTS (within a class)
    // ──────────────────────────────────

    @GetMapping("/classes/{classId}/students")
    public ResponseEntity<?> getStudents(@PathVariable int classId) {
        Optional<EClass> eClass = eClassRepository.findById(classId);
        if (eClass.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Map.of(
                "eClass", eClass.get(),
                "students", eClass.get().getPersons()
        ));
    }

    @PostMapping("/classes/{classId}/students")
    public ResponseEntity<?> addStudent(@PathVariable int classId,
                                         @RequestBody Map<String, String> body) {
        String email = body.get("email");
        Optional<EClass> eClassOpt = eClassRepository.findById(classId);
        if (eClassOpt.isEmpty()) return ResponseEntity.notFound().build();

        EClass eClass = eClassOpt.get();
        Person person = personRepository.readByEmail(email);

        if (person == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "No user found with email: " + email));
        }
        if (person.getEClass() != null) {
            if (person.getEClass().getClassId() == classId) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Student is already in this class"));
            }
            return ResponseEntity.badRequest()
                    .body(Map.of("error", person.getEmail() + " is already in " + person.getEClass().getName()));
        }

        person.setEClass(eClass);
        personRepository.save(person);
        return ResponseEntity.ok(Map.of("message", "Student added to class"));
    }

    @DeleteMapping("/classes/{classId}/students/{personId}")
    public ResponseEntity<?> removeStudent(@PathVariable int classId,
                                            @PathVariable int personId) {
        Optional<Person> person = personRepository.findById(personId);
        if (person.isEmpty()) return ResponseEntity.notFound().build();
        person.get().setEClass(null);
        personRepository.save(person.get());
        return ResponseEntity.ok(Map.of("message", "Student removed from class"));
    }

    // ──────────────────────────────────
    // SUBJECTS
    // ──────────────────────────────────

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getSubjects() {
        return ResponseEntity.ok(subjectRepository.findAll());
    }

    @PostMapping("/subjects")
    public ResponseEntity<?> addSubject(@RequestBody Subject subject) {
        subjectRepository.save(subject);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Subject added"));
    }

    @DeleteMapping("/subjects/{subjectId}")
    public ResponseEntity<?> deleteSubject(@PathVariable int subjectId) {
        subjectRepository.deleteById(subjectId);
        return ResponseEntity.ok(Map.of("message", "Subject deleted"));
    }

    // ──────────────────────────────────
    // USERS
    // ──────────────────────────────────

    @GetMapping("/users")
    public ResponseEntity<List<Person>> getUsers() {
        return ResponseEntity.ok(personRepository.findAll());
    }
}
