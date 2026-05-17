-- ROLES
INSERT IGNORE INTO roles(role_id, role_name, created_at, created_by)
VALUES
(1,'ADMIN',NOW(),'DBA'),
(2,'STUDENT',NOW(),'DBA'),
(3,'TEACHER',NOW(),'DBA');

-- CLASS
INSERT IGNORE INTO class(class_id, name, created_at, created_by)
VALUES
(1,'Class 1',NOW(),'ADMIN'),
(2,'Class 2',NOW(),'ADMIN');

-- ADDRESS
INSERT IGNORE INTO address(address_id, address1, address2, city, state, zip_code, created_at, created_by)
VALUES
(1,'Near Marshal Club','Rangamati','Dhanbad','Jharkhand','828122',NOW(),'ADMIN'),
(2,'Station Road','Main Market','Patna','Bihar','800001',NOW(),'ADMIN');

-- PERSON (ADMIN + dummy teacher/student)
INSERT IGNORE INTO person(person_id, name, email, mobile_num, password, role_id, address_id, class_id, created_at, created_by)
VALUES
(1,'ADMIN','admin@cc.cc','1234567897','123456',1,1,NULL,CURDATE(),'DBA'),
(2,'Teacher One','teacher1@school.com','9999999999','pass',3,2,1,CURDATE(),'DBA'),
(3,'Student One','student1@school.com','8888888888','pass',2,2,1,CURDATE(),'DBA');

-- UPDATE SAFE (only if needed)
UPDATE person SET address_id = 1 WHERE person_id = 1;

-- SUBJECTS
INSERT IGNORE INTO subject(subject_id, name, created_at, created_by)
VALUES
(1,'Math',NOW(),'ADMIN'),
(2,'Science',NOW(),'ADMIN'),
(3,'English',NOW(),'ADMIN');

-- PERSON SUBJECT mapping
INSERT IGNORE INTO person_subject(person_id, subject_id)
VALUES
(2,1),
(2,2),
(3,1),
(3,3);

-- HOLIDAYS
INSERT IGNORE INTO holidays(day, reason, type, created_at, created_by)
VALUES
('01 Jan','New Year','FESTIVAL',CURDATE(),'ADMIN'),
('26 Jan','Republic Day','NATIONALHOLIDAY',CURDATE(),'ADMIN'),
('15 Aug','Independence Day','NATIONALHOLIDAY',CURDATE(),'ADMIN'),
('25 Dec','Christmas','FESTIVAL',CURDATE(),'ADMIN');