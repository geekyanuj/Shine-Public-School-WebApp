package com.shinepublicschool.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/home", produces = "application/json")
@CrossOrigin(origins = "*")
public class HomeRestController {

    @GetMapping({"", "/"})
    public ResponseEntity<Map<String, String>> getHomeData() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to Shine Public School API");
        response.put("status", "UP");
        return ResponseEntity.ok(response);
    }
}
