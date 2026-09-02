package com.shinepublicschool.repository;

import com.shinepublicschool.model.FeePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeePaymentRepository extends JpaRepository<FeePayment, Integer> {
    List<FeePayment> findByPersonId(int personId);
    List<FeePayment> findByFeeStructureId(int feeStructureId);
}
