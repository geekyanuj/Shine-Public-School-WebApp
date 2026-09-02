package com.shinepublicschool.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "fee_payment")
public class FeePayment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    @Column(name = "person_id", nullable = false)
    private int personId; // student id

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "fee_structure_id", nullable = false)
    private int feeStructureId;

    @Column(name = "amount_paid", nullable = false)
    private Double amountPaid;

    @Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate;

    @Column(name = "payment_mode")
    private String paymentMode; // CASH, CARD, ONLINE, CHEQUE

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(nullable = false)
    private String status; // PAID, PARTIAL, PENDING
}
