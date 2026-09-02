package com.shinepublicschool.repository;

import com.shinepublicschool.model.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Integer> {
    List<ExamResult> findByExamId(int examId);
    List<ExamResult> findByPersonId(int personId);
}
