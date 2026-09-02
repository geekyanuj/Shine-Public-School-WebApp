package com.shinepublicschool.repository;

import com.shinepublicschool.model.Person;
import com.shinepublicschool.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
    Person readByEmail(String email);
}
