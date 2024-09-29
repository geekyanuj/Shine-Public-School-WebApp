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
        boolean isSaved = false;
        Roles role = rolesRepository.getByRoleName(ShinePublicSchoolConstants.STUDENT_ROLE);
        person.setRoles(role);
        person.setPassword(passwordEncoder.encode(person.getPassword())); //used to set the hashed password to DB
        person = personRepository.save(person);

        if (null != person && person.getPersonId() > 0) {
            isSaved = true;
        }
        return isSaved;
    }
}
