package com.shinepublicschool.rest;

import com.shinepublicschool.model.Notice;
import com.shinepublicschool.repository.NoticeRepository;
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
@RequestMapping("/api/notices")
public class NoticeRestController {

    @Autowired
    private NoticeRepository noticeRepository;

    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity.ok(noticeRepository.findAllByOrderByPostedDateDesc());
    }

    @GetMapping("/public")
    public ResponseEntity<List<Notice>> getPublicNotices() {
        return ResponseEntity.ok(noticeRepository.findByTargetRoleInOrderByPostedDateDesc(List.of("ALL", "STUDENT")));
    }

    @PostMapping
    public ResponseEntity<?> createNotice(@RequestBody Notice notice) {
        if (notice.getPostedDate() == null) {
            notice.setPostedDate(LocalDate.now());
        }
        if (notice.getPriority() == null) {
            notice.setPriority("MEDIUM");
        }
        if (notice.getTargetRole() == null) {
            notice.setTargetRole("ALL");
        }
        Notice saved = noticeRepository.save(notice);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable int id) {
        if (!noticeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        noticeRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Notice deleted successfully"));
    }
}
