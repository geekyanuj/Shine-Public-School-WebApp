package com.shinepublicschool.model;

import com.shinepublicschool.annotations.FieldsValueMatch;
import com.shinepublicschool.annotations.PasswordValidator;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "person")
@FieldsValueMatch.List({
    @FieldsValueMatch(
            field = "password",
            fieldMatch = "confirmPassword",
            message = "Passwords do not match!"
    )
})
public class Person extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int personId;

    @NotBlank(message = "Name must not be blank")
    @Size(min = 3, max = 50, message = "Name must be at least 3 characters long!")
    private String name;

    @NotBlank(message = "Mobile number must not be blank!")
    @Pattern(regexp = "(^$|[0-9]{10})", message = "Mobile number must be 10 digit long!")
    @Column(name = "mobile_num")
    private String mobileNum;

    @NotBlank(message = "Email must not be blank!")
    @Email(message = "Please provide a valid email!")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Password must not be blank!")
    @Size(min = 5, max = 200, message = "Password must have more than 5 characters!")
    @PasswordValidator
    private String password;

    @Transient
    private String confirmPassword;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", referencedColumnName = "roleId", nullable = false)
    private Roles roles;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "addressId", nullable = true)
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "class_id", referencedColumnName = "classId", nullable = true)
    private EClass eClass;
}
