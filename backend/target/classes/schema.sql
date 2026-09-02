-- ===========================
-- CONTACT MESSAGES
-- ===========================
CREATE TABLE IF NOT EXISTS contact_msg (
    contact_id   SERIAL PRIMARY KEY,
    name         VARCHAR(100)  NOT NULL,
    mobile_num   VARCHAR(10)   NOT NULL,
    email        VARCHAR(100)  NOT NULL,
    subject      VARCHAR(100)  NOT NULL,
    message      VARCHAR(500)  NOT NULL,
    status       VARCHAR(10)   NOT NULL,
    created_at   TIMESTAMP     NOT NULL DEFAULT NOW(),
    created_by   VARCHAR(50)   NOT NULL,
    updated_at   TIMESTAMP,
    updated_by   VARCHAR(50)
);

-- ===========================
-- ADDRESS
-- ===========================
CREATE TABLE IF NOT EXISTS address (
    address_id  SERIAL PRIMARY KEY,
    address1    VARCHAR(200)  NOT NULL,
    address2    VARCHAR(200),
    city        VARCHAR(200)  NOT NULL,
    state       VARCHAR(200)  NOT NULL,
    zip_code    VARCHAR(200)  NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    created_by  VARCHAR(50)   NOT NULL,
    updated_at  TIMESTAMP,
    updated_by  VARCHAR(50)
);

-- ===========================
-- ROLES
-- ===========================
CREATE TABLE IF NOT EXISTS roles (
    role_id     SERIAL PRIMARY KEY,
    role_name   VARCHAR(50)   NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    created_by  VARCHAR(50)   NOT NULL,
    updated_at  TIMESTAMP,
    updated_by  VARCHAR(50)
);

-- ===========================
-- CLASS
-- ===========================
CREATE TABLE IF NOT EXISTS class (
    class_id       SERIAL PRIMARY KEY,
    name           VARCHAR(100)  NOT NULL,
    class_teacher  VARCHAR(100),
    created_at     TIMESTAMP     NOT NULL DEFAULT NOW(),
    created_by     VARCHAR(50)   NOT NULL,
    updated_at     TIMESTAMP,
    updated_by     VARCHAR(50)
);

-- ===========================
-- PERSON
-- ===========================
CREATE TABLE IF NOT EXISTS person (
    person_id   SERIAL PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(100)  NOT NULL UNIQUE,
    mobile_num  VARCHAR(200)  NOT NULL,
    password    VARCHAR(200)  NOT NULL,
    role_id     INT           NOT NULL,
    address_id  INT,
    class_id    INT,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    created_by  VARCHAR(50)   NOT NULL,
    updated_at  TIMESTAMP,
    updated_by  VARCHAR(50),
    CONSTRAINT fk_person_role    FOREIGN KEY (role_id)    REFERENCES roles(role_id),
    CONSTRAINT fk_person_address FOREIGN KEY (address_id) REFERENCES address(address_id),
    CONSTRAINT fk_person_class   FOREIGN KEY (class_id)   REFERENCES class(class_id)
);

-- ===========================
-- SUBJECT
-- ===========================
CREATE TABLE IF NOT EXISTS subject (
    subject_id  SERIAL PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    created_by  VARCHAR(50)   NOT NULL,
    updated_at  TIMESTAMP,
    updated_by  VARCHAR(50)
);

-- ===========================
-- PERSON_SUBJECT (join table)
-- ===========================
CREATE TABLE IF NOT EXISTS person_subject (
    person_id   INT NOT NULL,
    subject_id  INT NOT NULL,
    PRIMARY KEY (person_id, subject_id),
    CONSTRAINT fk_ps_person  FOREIGN KEY (person_id)  REFERENCES person(person_id),
    CONSTRAINT fk_ps_subject FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
);

-- ===========================
-- HOLIDAYS
-- ===========================
CREATE TABLE IF NOT EXISTS holidays (
    day         VARCHAR(20)  NOT NULL,
    reason      VARCHAR(100) NOT NULL,
    type        VARCHAR(20)  NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    created_by  VARCHAR(50)  NOT NULL,
    updated_at  TIMESTAMP,
    updated_by  VARCHAR(50),
    PRIMARY KEY (day)
);

-- ===========================
-- ATTENDANCE
-- ===========================
CREATE TABLE IF NOT EXISTS attendance (
    attendance_id   SERIAL PRIMARY KEY,
    person_id       INT NOT NULL,
    person_name     VARCHAR(100),
    class_id        INT,
    attendance_date DATE NOT NULL,
    status          VARCHAR(20) NOT NULL,
    remarks         VARCHAR(255),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    updated_at      TIMESTAMP,
    updated_by      VARCHAR(50)
);

-- ===========================
-- STAFF
-- ===========================
CREATE TABLE IF NOT EXISTS staff (
    staff_id          SERIAL PRIMARY KEY,
    person_id         INT NOT NULL,
    name              VARCHAR(100) NOT NULL,
    email             VARCHAR(100) NOT NULL,
    mobile_num        VARCHAR(20),
    designation       VARCHAR(100) NOT NULL,
    department        VARCHAR(100) NOT NULL,
    qualification     VARCHAR(100),
    joining_date      DATE,
    salary            DOUBLE PRECISION,
    status            VARCHAR(20) DEFAULT 'ACTIVE',
    created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by        VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    updated_at        TIMESTAMP,
    updated_by        VARCHAR(50)
);

-- ===========================
-- EXAM & EXAM RESULTS
-- ===========================
CREATE TABLE IF NOT EXISTS exam (
    exam_id         SERIAL PRIMARY KEY,
    exam_name       VARCHAR(100) NOT NULL,
    class_id        INT NOT NULL,
    subject_name    VARCHAR(100) NOT NULL,
    exam_date       DATE,
    max_marks       INT NOT NULL,
    passing_marks   INT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    updated_at      TIMESTAMP,
    updated_by      VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS exam_result (
    result_id       SERIAL PRIMARY KEY,
    exam_id         INT NOT NULL,
    person_id       INT NOT NULL,
    student_name    VARCHAR(100),
    marks_obtained  DOUBLE PRECISION NOT NULL,
    grade           VARCHAR(10),
    remarks         VARCHAR(255),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    updated_at      TIMESTAMP,
    updated_by      VARCHAR(50)
);

-- ===========================
-- FEE STRUCTURE & FEE PAYMENT
-- ===========================
CREATE TABLE IF NOT EXISTS fee_structure (
    fee_structure_id SERIAL PRIMARY KEY,
    class_id         INT NOT NULL,
    fee_type         VARCHAR(100) NOT NULL,
    amount           DOUBLE PRECISION NOT NULL,
    due_date         DATE,
    description      VARCHAR(255),
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by       VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    updated_at       TIMESTAMP,
    updated_by       VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS fee_payment (
    payment_id       SERIAL PRIMARY KEY,
    person_id        INT NOT NULL,
    student_name     VARCHAR(100),
    fee_structure_id INT NOT NULL,
    amount_paid      DOUBLE PRECISION NOT NULL,
    payment_date     DATE NOT NULL,
    payment_mode     VARCHAR(50),
    transaction_id   VARCHAR(100),
    status           VARCHAR(20) NOT NULL,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by       VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    updated_at       TIMESTAMP,
    updated_by       VARCHAR(50)
);

-- ===========================
-- NOTICES
-- ===========================
CREATE TABLE IF NOT EXISTS notices (
    notice_id        SERIAL PRIMARY KEY,
    title            VARCHAR(200) NOT NULL,
    content          TEXT NOT NULL,
    target_role      VARCHAR(50) NOT NULL,
    posted_date      DATE NOT NULL,
    priority         VARCHAR(20) NOT NULL,
    category         VARCHAR(50),
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by       VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    updated_at       TIMESTAMP,
    updated_by       VARCHAR(50)
);

-- ===========================
-- TIMETABLE
-- ===========================
CREATE TABLE IF NOT EXISTS timetable (
    timetable_id     SERIAL PRIMARY KEY,
    class_id         INT NOT NULL,
    class_name       VARCHAR(100),
    subject_name     VARCHAR(100) NOT NULL,
    teacher_name     VARCHAR(100),
    day_of_week      VARCHAR(20) NOT NULL,
    start_time       VARCHAR(20) NOT NULL,
    end_time         VARCHAR(20) NOT NULL,
    room_number      VARCHAR(50),
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    created_by       VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    updated_at       TIMESTAMP,
    updated_by       VARCHAR(50)
);
