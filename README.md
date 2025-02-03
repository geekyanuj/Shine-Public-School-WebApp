# Shine Public School Management System

A Spring Boot application for managing a public school system. This application uses **Spring Data JPA** for database interactions, **Spring Security 6** for authentication and authorization, and provides features for both administrators and students.

## Features

- **Admin Management**:
  - Manage students
  - Manage classes
  - Manage subjects
  - Manage messages to students and staff
- **Student Login**:
  - Students can log in to view their details and messages
- **Admin Login**:
  - Admin can log in to manage school data (students, classes, subjects, messages)

## Technologies Used

- **Spring Boot 2.x**
- **Spring Data JPA**
- **Spring Security 6** for authentication and authorization
- **H2 Database** (for development)
- **Thymeleaf** for frontend rendering
- **Spring MVC**

## Prerequisites

- Java 17 or later
- Maven or Gradle for building the project
- A compatible IDE (e.g., IntelliJ IDEA, Eclipse)

## Setup and Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/shine-public-school.git
cd shine-public-school


## Authentication and Authorization
Admin has full access to all features, including managing students, subjects, classes, and sending messages.
Students can view their details, subjects, and messages.
Authentication is handled using Spring Security with roles assigned to users.
