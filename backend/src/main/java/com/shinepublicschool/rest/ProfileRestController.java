package com.shinepublicschool.rest;

import com.shinepublicschool.model.Address;
import com.shinepublicschool.model.Person;
import com.shinepublicschool.model.Profile;
import com.shinepublicschool.repository.PersonRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/profile")
public class ProfileRestController {

    @Autowired
    private PersonRepository personRepository;

    // GET /api/profile — returns profile data for the logged-in user
    @GetMapping
    public ResponseEntity<?> getProfile(Authentication authentication) {
        Person person = personRepository.readByEmail(authentication.getName());

        Profile profile = new Profile();
        profile.setName(person.getName());
        profile.setMobileNum(person.getMobileNum());
        profile.setEmail(person.getEmail());

        if (person.getAddress() != null && person.getAddress().getAddressId() > 0) {
            profile.setAddress1(person.getAddress().getAddress1());
            profile.setAddress2(person.getAddress().getAddress2());
            profile.setCity(person.getAddress().getCity());
            profile.setState(person.getAddress().getState());
            profile.setZipcode(person.getAddress().getZipcode());
        }

        return ResponseEntity.ok(profile);
    }

    // PUT /api/profile — updates profile
    @PutMapping
    public ResponseEntity<?> updateProfile(@Valid @RequestBody Profile profile,
                                            Authentication authentication) {
        Person person = personRepository.readByEmail(authentication.getName());
        person.setName(profile.getName());
        person.setMobileNum(profile.getMobileNum());
        person.setEmail(profile.getEmail());

        if (person.getAddress() == null || person.getAddress().getAddressId() <= 0) {
            person.setAddress(new Address());
        }
        person.getAddress().setAddress1(profile.getAddress1());
        person.getAddress().setAddress2(profile.getAddress2());
        person.getAddress().setCity(profile.getCity());
        person.getAddress().setState(profile.getState());
        person.getAddress().setZipcode(profile.getZipcode());

        personRepository.save(person);
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }
}
