package com.shinepublicschool.repository;

import com.shinepublicschool.model.FeeStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeeStructureRepository extends JpaRepository<FeeStructure, Integer> {
    List<FeeStructure> findByClassId(Integer classId);
}
