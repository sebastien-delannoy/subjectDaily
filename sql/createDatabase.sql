CREATE DATABASE `studyDaily` ;

use `studyDaily`;

CREATE TABLE studyDaily.`studies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `therapeutic_area` varchar(255) DEFAULT NULL,
  `study_code` varchar(255) DEFAULT NULL,
  `study_name` varchar(255) DEFAULT NULL,
  `short_desc` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `plansubject` varchar(255) DEFAULT NULL,
  `enrol_rate` varchar(45) DEFAULT NULL,
  `actualsubject` varchar(255) DEFAULT NULL,
  `risk_score` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE studyDaily.`studysites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `study_id` int DEFAULT NULL,
  `site_reference` varchar(255) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `centre` varchar(255) DEFAULT NULL,
  `principalinvest` varchar(255) DEFAULT NULL,
  `actualenroll` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `plamenroll` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`study_id`),
  CONSTRAINT `study_id` FOREIGN KEY (`study_id`) REFERENCES `studies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE studyDaily.`subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `study_id` int DEFAULT NULL,
  `site_id` int DEFAULT NULL,
  `subject_number` varchar(255) DEFAULT NULL,
  `subject_status` varchar(255) DEFAULT NULL,
  `current_visit` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `site_id_idx` (`site_id`),
  CONSTRAINT `site_id` FOREIGN KEY (`site_id`) REFERENCES `studysites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE studyDaily.`users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE studyDaily.`events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `study_id` int DEFAULT NULL,
  `site_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL,
  `event_category` varchar(255) DEFAULT NULL,
  `event_desc` varchar(255) DEFAULT NULL,
  `event_res` varchar(255) DEFAULT NULL,
  `event_critic` varchar(255) DEFAULT NULL,
  `event_closed` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_id_idx` (`subject_id`),
  CONSTRAINT `subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




