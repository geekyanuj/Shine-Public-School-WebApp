# Shine Public School Web App

A complete School Management ERP and Website Solution built for educational institutions to manage their day-to-day operations efficiently while also showcasing the school website publicly.

The application combines:
- School ERP
- Student Management
- Teacher Management
- Administration Panel
- Public School Website
- Role-Based Authentication & Authorization

Built using Spring Boot, Spring Security, Spring Data JPA, MySQL, and Thymeleaf.

---

## Features

### Public Website
- School landing page
- About school
- Academics information
- Admission details
- Gallery and announcements
- Contact page

### ERP & Management System
- Student management
- Teacher management
- Admin dashboard
- Attendance management
- Role-based access control
- User authentication
- Profile management
- Academic records
- Notices and announcements

### Multi-Role Authentication
The application supports multiple user roles:

| Role | Access |
|------|--------|
| Admin | Full system access |
| Teacher | Manage classes, attendance, students |
| Student | View profile, notices, academic details |

---

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate

### Frontend
- Thymeleaf
- HTML5
- CSS3
- JavaScript

### Database
- MySQL

### DevOps & Deployment
- Docker
- Docker Compose

---

## Project Structure

```text
src/
 ├── main/
 │    ├── java/
 │    ├── resources/
 │    │     ├── templates/
 │    │     ├── static/
 │    │     ├── schema.sql
 │    │     ├── data.sql
 │    │     └── application.properties
 │    └── test/
