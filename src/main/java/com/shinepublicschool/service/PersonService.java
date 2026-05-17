package com.shinepublicschool.service;

import com.shinepublicschool.Constants.ShinePublicSchoolConstants;
import com.shinepublicschool.model.Person;
import com.shinepublicschool.model.Roles;
import com.shinepublicschool.repository.PersonRepository;
import com.shinepublicschool.repository.RolesRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean createNewPerson(Person person) {

        String roleName = person.getRoles().getRoleName();

        Roles role = rolesRepository.getByRoleName(roleName);

        if(role == null){
            throw new RuntimeException("Role not found: " + roleName);
        }

        person.setRoles(role);

        person.setPassword(passwordEncoder.encode(person.getPassword()));

        person = personRepository.save(person);

        return person.getPersonId() > 0;
    }

    public boolean resetPassword(String email, String newPassword) {

        Person person = personRepository.readByEmail(email);

        if (person == null) {
            return false;
        }

        person.setPassword(passwordEncoder.encode(newPassword));
        personRepository.save(person);

        return true;
    }
}
