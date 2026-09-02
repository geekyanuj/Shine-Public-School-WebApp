-- ROLES
INSERT INTO roles(role_id, role_name, created_at, created_by)
VALUES
  (1, 'ADMIN',   NOW(), 'DBA'),
  (2, 'STUDENT', NOW(), 'DBA'),
  (3, 'TEACHER', NOW(), 'DBA')
ON CONFLICT (role_id) DO NOTHING;

-- CLASS
INSERT INTO class(class_id, name, created_at, created_by)
VALUES
  (1, 'Class 1', NOW(), 'ADMIN'),
  (2, 'Class 2', NOW(), 'ADMIN'),
  (3, 'Class 3', NOW(), 'ADMIN')
ON CONFLICT (class_id) DO NOTHING;

-- ADDRESS
INSERT INTO address(address_id, address1, address2, city, state, zip_code, created_at, created_by)
VALUES
  (1, 'Near Marshal Club', 'Rangamati', 'Dhanbad', 'Jharkhand', '828122', NOW(), 'ADMIN'),
  (2, 'Station Road',      'Main Market', 'Patna', 'Bihar',     '800001', NOW(), 'ADMIN')
ON CONFLICT (address_id) DO NOTHING;

-- PERSON
INSERT INTO person(person_id, name, email, mobile_num, password, role_id, address_id, class_id, created_at, created_by)
VALUES
  (1, 'ADMIN',       'admin@cc.cc',            '1234567897', '$2a$12$1234567890123456789012uWq5rKQi.aGVopPnYjbLvqzFLJ4SBZKO', 1, 1, NULL, NOW(), 'DBA'),
  (2, 'Teacher One', 'teacher1@school.com',     '9999999999', '$2a$12$1234567890123456789012uWq5rKQi.aGVopPnYjbLvqzFLJ4SBZKO', 3, 2, 1,    NOW(), 'DBA'),
  (3, 'Student One', 'student1@school.com',     '8888888888', '$2a$12$1234567890123456789012uWq5rKQi.aGVopPnYjbLvqzFLJ4SBZKO', 2, 2, 1,    NOW(), 'DBA')
ON CONFLICT (person_id) DO NOTHING;

-- SUBJECTS
INSERT INTO subject(subject_id, name, created_at, created_by)
VALUES
  (1, 'Math',    NOW(), 'ADMIN'),
  (2, 'Science', NOW(), 'ADMIN'),
  (3, 'English', NOW(), 'ADMIN'),
  (4, 'History', NOW(), 'ADMIN')
ON CONFLICT (subject_id) DO NOTHING;

-- PERSON_SUBJECT mapping
INSERT INTO person_subject(person_id, subject_id)
VALUES (2, 1), (2, 2), (3, 1), (3, 3)
ON CONFLICT (person_id, subject_id) DO NOTHING;

-- HOLIDAYS
INSERT INTO holidays(day, reason, type, created_at, created_by)
VALUES
  ('01 Jan', 'New Year',         'FESTIVAL',       NOW(), 'ADMIN'),
  ('26 Jan', 'Republic Day',     'NATIONALHOLIDAY', NOW(), 'ADMIN'),
  ('14 Mar', 'Holi',             'FESTIVAL',       NOW(), 'ADMIN'),
  ('14 Apr', 'Ambedkar Jayanti', 'FESTIVAL',       NOW(), 'ADMIN'),
  ('15 Aug', 'Independence Day', 'NATIONALHOLIDAY', NOW(), 'ADMIN'),
  ('30 Sep', 'Durga Puja',       'FESTIVAL',       NOW(), 'ADMIN'),
  ('02 Oct', 'Gandhi Jayanti',   'NATIONALHOLIDAY', NOW(), 'ADMIN'),
  ('21 Oct', 'Diwali',           'FESTIVAL',       NOW(), 'ADMIN'),
  ('05 Nov', 'Guru Nanak Gurupurab', 'FESTIVAL',   NOW(), 'ADMIN'),
  ('25 Dec', 'Christmas Day',    'FESTIVAL',       NOW(), 'ADMIN')
ON CONFLICT (day) DO NOTHING;

-- STAFF
INSERT INTO staff(staff_id, person_id, name, email, mobile_num, designation, department, qualification, joining_date, salary, status, created_at, created_by)
VALUES
  (1, 2, 'Teacher One', 'teacher1@school.com', '9999999999', 'Senior Mathematics Teacher', 'Mathematics', 'M.Sc., B.Ed.', '2022-06-15', 45000.00, 'ACTIVE', NOW(), 'ADMIN')
ON CONFLICT (staff_id) DO NOTHING;

-- NOTICES
INSERT INTO notices(notice_id, title, content, target_role, posted_date, priority, category, created_at, created_by)
VALUES
  (1, 'Welcome to New Academic Year 2026', 'We warmly welcome all new and returning students to Shine Public School! Check your class timetables and fee schedules.', 'ALL', CURRENT_DATE, 'HIGH', 'General', NOW(), 'ADMIN'),
  (2, 'Staff Meeting on Friday', 'All faculty members are requested to join the monthly academic review meeting in Conference Room B at 3:00 PM.', 'TEACHER', CURRENT_DATE, 'MEDIUM', 'Academic', NOW(), 'ADMIN')
ON CONFLICT (notice_id) DO NOTHING;

-- TIMETABLE
INSERT INTO timetable(timetable_id, class_id, class_name, subject_name, teacher_name, day_of_week, start_time, end_time, room_number, created_at, created_by)
VALUES
  (1, 1, 'Class 1', 'Mathematics', 'Teacher One', 'MONDAY', '09:00 AM', '09:45 AM', 'Room 101', NOW(), 'ADMIN'),
  (2, 1, 'Class 1', 'Science', 'Teacher One', 'MONDAY', '09:45 AM', '10:30 AM', 'Lab 1', NOW(), 'ADMIN'),
  (3, 1, 'Class 1', 'English', 'Mrs. Sharma', 'TUESDAY', '09:00 AM', '09:45 AM', 'Room 101', NOW(), 'ADMIN')
ON CONFLICT (timetable_id) DO NOTHING;

-- FEE STRUCTURE
INSERT INTO fee_structure(fee_structure_id, class_id, fee_type, amount, due_date, description, created_at, created_by)
VALUES
  (1, 1, 'Tuition Fee Q1', 12000.00, '2026-09-30', 'Quarter 1 Tuition Fee', NOW(), 'ADMIN'),
  (2, 1, 'Examination Fee', 1500.00, '2026-10-15', 'Midterm Examination Fee', NOW(), 'ADMIN')
ON CONFLICT (fee_structure_id) DO NOTHING;

-- FEE PAYMENT
INSERT INTO fee_payment(payment_id, person_id, student_name, fee_structure_id, amount_paid, payment_date, payment_mode, transaction_id, status, created_at, created_by)
VALUES
  (1, 3, 'Student One', 1, 12000.00, CURRENT_DATE, 'ONLINE', 'TXN-984210', 'PAID', NOW(), 'ADMIN')
ON CONFLICT (payment_id) DO NOTHING;

-- EXAM & RESULTS
INSERT INTO exam(exam_id, exam_name, class_id, subject_name, exam_date, max_marks, passing_marks, created_at, created_by)
VALUES
  (1, 'Midterm Exam 2026', 1, 'Mathematics', '2026-09-25', 100, 35, NOW(), 'ADMIN'),
  (2, 'Midterm Exam 2026', 1, 'Science', '2026-09-27', 100, 35, NOW(), 'ADMIN')
ON CONFLICT (exam_id) DO NOTHING;

INSERT INTO exam_result(result_id, exam_id, person_id, student_name, marks_obtained, grade, remarks, created_at, created_by)
VALUES
  (1, 1, 3, 'Student One', 88.5, 'A', 'Excellent performance!', NOW(), 'ADMIN')
ON CONFLICT (result_id) DO NOTHING;

-- ATTENDANCE
INSERT INTO attendance(attendance_id, person_id, person_name, class_id, attendance_date, status, remarks, created_at, created_by)
VALUES
  (1, 3, 'Student One', 1, CURRENT_DATE, 'PRESENT', 'On time', NOW(), 'ADMIN')
ON CONFLICT (attendance_id) DO NOTHING;