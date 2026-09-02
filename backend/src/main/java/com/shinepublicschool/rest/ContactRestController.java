package com.shinepublicschool.rest;

import com.shinepublicschool.model.Contact;
import com.shinepublicschool.service.ContactService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
public class ContactRestController {

    @Autowired
    private ContactService contactService;

    // POST /api/contact — public endpoint to submit a message
    @PostMapping("/contact")
    public ResponseEntity<?> saveMessage(@Valid @RequestBody Contact contact) {
        boolean saved = contactService.saveMessageDetails(contact);
        if (saved) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "Your message has been sent successfully!"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to send message"));
    }

    // GET /api/admin/messages — admin only, returns open & closed messages
    @GetMapping("/admin/messages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getMessages() {
        List<Contact> open   = contactService.findMsgsWithOpenStatus();
        List<Contact> closed = contactService.findMsgsWithClosedStatus();
        return ResponseEntity.ok(Map.of("open", open, "closed", closed));
    }

    // PATCH /api/admin/messages/{id}/close
    @PatchMapping("/admin/messages/{id}/close")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> closeMessage(@PathVariable int id) {
        contactService.updateMsgStatus(id);
        return ResponseEntity.ok(Map.of("message", "Message closed"));
    }

    // PATCH /api/admin/messages/{id}/reopen
    @PatchMapping("/admin/messages/{id}/reopen")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> reopenMessage(@PathVariable int id) {
        contactService.updateMsgStatusToReopen(id);
        return ResponseEntity.ok(Map.of("message", "Message reopened"));
    }
}
