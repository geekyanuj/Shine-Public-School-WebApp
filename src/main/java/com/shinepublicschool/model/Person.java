package com.shinepublicschool.model;

import com.shinepublicschool.annotations.FieldsValueMatch;
import com.shinepublicschool.annotations.PasswordValidator;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@FieldsValueMatch.List({
    @FieldsValueMatch(
            field = "password",
            fieldMatch = "confirmPassword",
            message = "Passwords do not match!"
    )
})

public class Person extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private int personId;

    @NotBlank(message = "Name must not be blank")
    @Size(min = 3, max = 15, message = "Name must not be at least 3 character long!")
    private String name;

    @NotBlank(message = "Mobile number must not be blank!")
    @Pattern(regexp = "(^$|[0-9]{10})", message = "Mobile number must be 10 digit long!")
    @Column(name = "mobile_num")
    private String mobileNum;

    @NotBlank(message = "Email must not be blank!")
    @Email(message = "Please provide a valid email!")
    private String email;

    @NotBlank(message = "Password must not be blank!")
    @Size(min = 5, max = 18, message = "Password must have more than 5 characters!")
    @PasswordValidator
    private String password;

    @NotBlank(message = "Confirm Password must not be blank!")
    @Size(min = 5, max = 18, message = "Confirm Password must have more than 5 characters!")
    @Transient //used this annotation to prevent this field to save to database in hibernate, not consider it to do any db related operation
    private String confirmPassword;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = Roles.class)
    @JoinColumn(name = "role_id", referencedColumnName = "roleId", nullable = false)
    private Roles roles;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, targetEntity = Address.class)
    @JoinColumn(name = "address_id", referencedColumnName = "addressId", nullable = true)
    private Address address;
}
