package com.shinepublicschool.repository;

import com.shinepublicschool.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(path = "roles")  //used to define the path since default path has es in end which makes spelling mistakes
public interface RolesRepository extends JpaRepository<Roles, Integer> {
    Roles getByRoleName(String roleName);
}
