package com.shinepublicschool.rest;

import com.shinepublicschool.model.Person;
import com.shinepublicschool.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardRestController {

    @Autowired
    private PersonRepository personRepository;

    // GET /api/dashboard — returns logged-in user info for dashboard
    @GetMapping
    public ResponseEntity<?> getDashboard(Authentication authentication) {
        Person person = personRepository.readByEmail(authentication.getName());
        String role = authentication.getAuthorities().stream()
                .findFirst()
                .map(a -> a.getAuthority().replace("ROLE_", ""))
                .orElse("USER");

        return ResponseEntity.ok(Map.of(
                "name",  person.getName(),
                "email", person.getEmail(),
                "role",  role
        ));
    }
}
