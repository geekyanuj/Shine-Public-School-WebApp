package com.shinepublicschool.repository;

import com.shinepublicschool.model.Address;
import com.shinepublicschool.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {

}
