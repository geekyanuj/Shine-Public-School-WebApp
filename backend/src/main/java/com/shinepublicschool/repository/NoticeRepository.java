package com.shinepublicschool.repository;

import com.shinepublicschool.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    List<Notice> findByTargetRoleInOrderByPostedDateDesc(List<String> targetRoles);
    List<Notice> findAllByOrderByPostedDateDesc();
}
