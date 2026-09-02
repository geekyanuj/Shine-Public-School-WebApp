package com.shinepublicschool.rest;

import com.shinepublicschool.model.Person;
import com.shinepublicschool.model.Roles;
import com.shinepublicschool.repository.PersonRepository;
import com.shinepublicschool.security.JwtUtil;
import com.shinepublicschool.service.PersonService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PersonService personService;

    @Autowired
    private PersonRepository personRepository;

    // ─────────────────────────────────────────────────
    // POST /api/auth/login
    // Body: { "email": "...", "password": "..." }
    // ─────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email    = credentials.get("email");
        String password = credentials.get("password");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            String token = jwtUtil.generateToken(authentication);

            // Fetch person for extra info
            Person person = personRepository.readByEmail(email);
            String role = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst().orElse("");

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "name",  person.getName(),
                    "email", person.getEmail(),
                    "role",  role
            ));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }

    // ─────────────────────────────────────────────────
    // POST /api/auth/register
    // Body: Person JSON (with roles.roleName)
    // ─────────────────────────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Person person) {
        // Default role to STUDENT if not specified
        if (person.getRoles() == null || person.getRoles().getRoleName() == null) {
            Roles roles = new Roles();
            roles.setRoleName("STUDENT");
            person.setRoles(roles);
        }

        try {
            boolean saved = personService.createNewPerson(person);
            if (saved) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(Map.of("message", "Registration successful. Please login."));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Registration failed"));
            }
        } catch (Exception e) {
            log.error("Registration error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────
    // POST /api/auth/forgot-password
    // Body: { "email": "...", "newPassword": "...", "confirmPassword": "..." }
    // ─────────────────────────────────────────────────
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        String email           = body.get("email");
        String newPassword     = body.get("newPassword");
        String confirmPassword = body.get("confirmPassword");

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Passwords do not match"));
        }

        boolean updated = personService.resetPassword(email, newPassword);
        if (!updated) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Email not found"));
        }

        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }
}
