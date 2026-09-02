package com.shinepublicschool.rest;

import com.shinepublicschool.model.FeePayment;
import com.shinepublicschool.model.FeeStructure;
import com.shinepublicschool.repository.FeePaymentRepository;
import com.shinepublicschool.repository.FeeStructureRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/fees")
public class FeeRestController {

    @Autowired
    private FeeStructureRepository feeStructureRepository;

    @Autowired
    private FeePaymentRepository feePaymentRepository;

    @GetMapping("/structures")
    public ResponseEntity<List<FeeStructure>> getAllFeeStructures() {
        return ResponseEntity.ok(feeStructureRepository.findAll());
    }

    @GetMapping("/structures/class/{classId}")
    public ResponseEntity<List<FeeStructure>> getFeeStructuresByClass(@PathVariable Integer classId) {
        return ResponseEntity.ok(feeStructureRepository.findByClassId(classId));
    }

    @PostMapping("/structures")
    public ResponseEntity<?> createFeeStructure(@RequestBody FeeStructure feeStructure) {
        FeeStructure saved = feeStructureRepository.save(feeStructure);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/structures/{id}")
    public ResponseEntity<?> deleteFeeStructure(@PathVariable int id) {
        if (!feeStructureRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        feeStructureRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Fee structure removed"));
    }

    @GetMapping("/payments")
    public ResponseEntity<List<FeePayment>> getAllPayments() {
        return ResponseEntity.ok(feePaymentRepository.findAll());
    }

    @GetMapping("/payments/student/{personId}")
    public ResponseEntity<List<FeePayment>> getPaymentsByStudent(@PathVariable int personId) {
        return ResponseEntity.ok(feePaymentRepository.findByPersonId(personId));
    }

    @PostMapping("/payments")
    public ResponseEntity<?> recordPayment(@RequestBody FeePayment payment) {
        if (payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDate.now());
        }
        if (payment.getStatus() == null) {
            payment.setStatus("PAID");
        }
        FeePayment saved = feePaymentRepository.save(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
