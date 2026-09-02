package com.shinepublicschool.rest;

import com.shinepublicschool.model.Person;
import com.shinepublicschool.model.Roles;
import com.shinepublicschool.service.PersonService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/api/public", produces = "application/json")
@CrossOrigin(origins = "*")
public class PublicRestController {

    @Autowired
    private PersonService personService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> createUser(@Valid @RequestBody Person person, Errors errors) {
        Map<String, String> response = new HashMap<>();

        if (errors.hasErrors()) {
            response.put("message", "Validation failed");
            response.put("error", errors.getAllErrors().get(0).getDefaultMessage());
            return ResponseEntity.badRequest().body(response);
        }
        
        if (person.getRoles() == null) {
            person.setRoles(new Roles());
        }

        boolean isSaved = personService.createNewPerson(person);
        if (isSaved) {
            response.put("message", "User registered successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            response.put("message", "Failed to register user");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> processForgotPassword(@RequestBody Map<String, String> request) {
        Map<String, String> response = new HashMap<>();
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        String confirmPassword = request.get("confirmPassword");

        if (newPassword == null || !newPassword.equals(confirmPassword)) {
            response.put("message", "Passwords do not match!");
            return ResponseEntity.badRequest().body(response);
        }

        boolean isUpdated = personService.resetPassword(email, newPassword);

        if (!isUpdated) {
            response.put("message", "Email not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        response.put("message", "Password updated successfully!");
        return ResponseEntity.ok(response);
    }
}
