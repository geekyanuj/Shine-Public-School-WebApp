package com.shinepublicschool.repository;

import com.shinepublicschool.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
    List<Staff> findByDepartment(String department);
    Optional<Staff> findByPersonId(int personId);
}
