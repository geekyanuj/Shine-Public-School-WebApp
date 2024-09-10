INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('01 Jan', 'New Year', 'FESTIVAL',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('26 Jan', 'Republic Day', 'NATIONALHOLIDAY',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('14 Mar', 'Holi', 'FESTIVAL',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('14 Apr', 'Ambedkar Jayanti', 'FESTIVAL',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('15 Aug', 'Independence Day', 'NATIONALHOLIDAY',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('30 Sep', 'Durga Puja', 'FESTIVAL',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('02 Oct', 'Gandhi Jayanti', 'NATIONALHOLIDAY',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('21 Oct', 'Diwali','FESTIVAL',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('05 Nov', 'Guru Nanak Gurupurab','FESTIVAL',CURDATE(),'ADMIN');
INSERT INTO `holidays`(`day`,`reason`,`type`,`created_at`,`created_by`) VALUES ('25 Dec', 'Christmas Day','FESTIVAL',CURDATE(),'ADMIN');


INSERT INTO `roles`(`role_name`,`created_at`,`created_by`) VALUES('ADMIN',CURDATE(),'DBA');
INSERT INTO `roles`(`role_name`,`created_at`,`created_by`) VALUES('STUDENT',CURDATE(),'DBA');
INSERT INTO `roles`(`role_name`,`created_at`,`created_by`) VALUES('TEACHER',CURDATE(),'DBA');
