CREATE TABLE IF NOT EXISTS `contact_msg`(
    `contact_id` int AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(100) NOT NULL ,
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

CREATE TABLE IF NOT EXISTS `holidays`(
    `day` varchar(20) NOT NULL ,
    `reason` varchar(100) NOT NULL,
    `type` varchar(20) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `roles`(
    `role_id` int NOT NULL AUTO_INCREMENT ,
    `role_name` varchar(50) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL,
    PRIMARY KEY(`role_id`)
);

CREATE TABLE IF NOT EXISTS `address`(
    `address_id` int NOT NULL AUTO_INCREMENT ,
    `address1` varchar(200) NOT NULL,
    `address2` varchar(200) NOT NULL,
    `city` varchar(200) NOT NULL,
    `state` varchar(200) NOT NULL,
    `zip_code` varchar(200) NOT NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL,
    PRIMARY KEY(`address_id`)
);

CREATE TABLE IF NOT EXISTS `person`(
    `person_id` int NOT NULL AUTO_INCREMENT ,
    `name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `mobile_num` varchar(200) NOT NULL,
    `password` varchar(200) NOT NULL,
    `role_id` int NOT NULL,
    `address_id` int NULL,
    `created_at` timestamp NOT NULL,
    `created_by` varchar(15) NOT NULL,
    `updated_at` timestamp DEFAULT NULL,
    `updated_by` varchar(15) DEFAULT NULL,
    PRIMARY KEY(`person_id`),
    FOREIGN KEY(role_id) REFERENCES roles(role_id),
    FOREIGN KEY(address_id) REFERENCES address(address_id)
);