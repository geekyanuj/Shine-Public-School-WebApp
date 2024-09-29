package com.shinepublicschool.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class Profile {

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

    @NotBlank(message = "Address Line 1 must not be blank!")
    @Size(min = 5, message = "Address Line 1 must be at least 5 characters long!")
    private String address1;

    private String address2;

    @NotBlank(message = "City must not be blank!")
    @Size(min = 3, message = "City must be at least 3 digit long!")
    private String city;

    @NotBlank(message = "State must not be blank!")
    @Size(min = 5, message = "State must be at least 5 digit long!")
    private String state;

    @NotBlank(message = "Zip Code must not be blank!")
    @Pattern(regexp = "^$|[0-9]{6}", message = "ZIP Code must be 6 digit long")
    @Column(name = "zip_code")
    private String zipcode;
}
