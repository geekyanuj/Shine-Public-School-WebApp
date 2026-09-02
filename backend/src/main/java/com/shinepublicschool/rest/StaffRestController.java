package com.shinepublicschool.rest;

import com.shinepublicschool.model.Staff;
import com.shinepublicschool.repository.StaffRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/staff")
public class StaffRestController {

    @Autowired
    private StaffRepository staffRepository;

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff(
            @RequestParam(required = false) String department) {
        if (department != null && !department.isBlank()) {
            return ResponseEntity.ok(staffRepository.findByDepartment(department));
        }
        return ResponseEntity.ok(staffRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable int id) {
        Optional<Staff> staff = staffRepository.findById(id);
        if (staff.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(staff.get());
    }

    @PostMapping
    public ResponseEntity<?> createStaff(@RequestBody Staff staff) {
        if (staff.getStatus() == null) {
            staff.setStatus("ACTIVE");
        }
        Staff saved = staffRepository.save(staff);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable int id, @RequestBody Staff staffDetails) {
        Optional<Staff> staffOpt = staffRepository.findById(id);
        if (staffOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Staff existing = staffOpt.get();
        existing.setName(staffDetails.getName());
        existing.setEmail(staffDetails.getEmail());
        existing.setMobileNum(staffDetails.getMobileNum());
        existing.setDesignation(staffDetails.getDesignation());
        existing.setDepartment(staffDetails.getDepartment());
        existing.setQualification(staffDetails.getQualification());
        existing.setJoiningDate(staffDetails.getJoiningDate());
        existing.setSalary(staffDetails.getSalary());
        existing.setStatus(staffDetails.getStatus());

        Staff updated = staffRepository.save(existing);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable int id) {
        if (!staffRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        staffRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Staff record deleted successfully"));
    }
}
