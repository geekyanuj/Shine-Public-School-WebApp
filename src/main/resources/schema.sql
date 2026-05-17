CREATE TABLE IF NOT EXISTS `contact_msg` (
    `contact_id` int AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(100) NOT NULL,
    `mobile_num` varchar(10) NOT NULL,
    `email` varchar(100) NOT NULL,
    `subject` varchar(100) NOT NULL,
    `message` varchar(500) NOT NULL,
    `status` varchar(10) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `address` (
    `address_id` int NOT NULL AUTO_INCREMENT,
    `address1` varchar(200) NOT NULL,
    `address2` varchar(200) NOT NULL,
    `city` varchar(200) NOT NULL,
    `state` varchar(200) NOT NULL,
    `zip_code` varchar(200) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL,
    PRIMARY KEY (`address_id`)
);

CREATE TABLE IF NOT EXISTS `roles` (
    `role_id` int NOT NULL AUTO_INCREMENT,
    `role_name` varchar(50) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL,
    PRIMARY KEY (`role_id`)
);



CREATE TABLE IF NOT EXISTS `class` (
    `class_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `class_teacher` varchar(100) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL,
    PRIMARY KEY (`class_id`)
);

CREATE TABLE IF NOT EXISTS `person` (
    `person_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `mobile_num` varchar(200) NOT NULL,
    `password` varchar(200) NOT NULL,
    `role_id` int NOT NULL,
    `address_id` int DEFAULT NULL,
    `class_id` int DEFAULT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL,
    PRIMARY KEY (`person_id`),
    CONSTRAINT `FK_PERSON_ROLE` FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`),
    CONSTRAINT `FK_PERSON_ADDRESS` FOREIGN KEY (`address_id`) REFERENCES `address`(`address_id`),
    CONSTRAINT `FK_PERSON_CLASS` FOREIGN KEY (`class_id`) REFERENCES `class`(`class_id`)
);

CREATE TABLE IF NOT EXISTS `subject` (
    `subject_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL,
    PRIMARY KEY (`subject_id`)
);

CREATE TABLE IF NOT EXISTS `person_subject` (
    `person_id` int NOT NULL,
    `subject_id` int NOT NULL,
    PRIMARY KEY (`person_id`, `subject_id`),
    CONSTRAINT `FK_PS_PERSON` FOREIGN KEY (`person_id`) REFERENCES person(person_id),
    CONSTRAINT `FK_PS_SUBJECT` FOREIGN KEY (`subject_id`) REFERENCES subject(subject_id)
);

CREATE TABLE IF NOT EXISTS `holidays` (
    `day` varchar(20) NOT NULL,
    `reason` varchar(100) NOT NULL,
    `type` varchar(20) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL
);
