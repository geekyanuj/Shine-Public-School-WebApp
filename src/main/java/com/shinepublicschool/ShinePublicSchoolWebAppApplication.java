package com.shinepublicschool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.shinepublicschool.repository")
@EntityScan("com.shinepublicschool.model")
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class ShinePublicSchoolWebAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShinePublicSchoolWebAppApplication.class, args);
    }

}
