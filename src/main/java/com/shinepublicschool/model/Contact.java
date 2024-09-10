package com.shinepublicschool.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@Table(name = "contact_msg")
public class Contact extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator ="native")
    @GenericGenerator(name = "native", strategy = "native")
    @Column(name = "contact_id")
    private int contactId;

    @NotBlank(message = "Name can't be blank")
    @Size(min = 3, message = "Name must be at least 3 characters long")
    private String name;

    @NotBlank(message = "Mobile No can't be blank")
    @Pattern(regexp ="^$|[0-9]{10}",message = "Mobile number must be 10 digits")
    private String mobileNum;

    @NotBlank(message = "Email can't be blank")
    @Email(message = "Email is not valid")
    private String email;

    @NotBlank(message = "Subject can't be blank")
    @Size(min = 5,message = "Subject must be at least 5 characters long")
    private String subject;

    @NotBlank(message = "Message can't be blank")
    @Size(min = 10, message = "Message must be at least 10 characters long")
    private String message;

    private String status;

}
