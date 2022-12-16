INSERT INTO `studies` VALUES (3,'Vaccines','VAC0001','INDIGO','Flu vaccine study','12-Sep-2018','Active','250','15','','','2022-12-15 17:16:01','2022-12-15 21:45:49');
INSERT INTO `studies` VALUES (4,'Immunology','EFC15677','SUNSHINE','rPMS - CRS with NP local study in korea','15-Oct-2021','Active','300','5','','','2022-12-15 20:34:36','2022-12-15 20:34:36');


INSERT INTO `studysites` VALUES (4,3,'7240001','Spain','Hospital Universitario Marques De Valdecilla','Michele Maio','','Active','60','2022-12-15 21:48:37','2022-12-15 21:48:37');
INSERT INTO `studysites` VALUES (5,3,'7240002','Spain','Hospital Universitari Vall d Hebron','Eva Munoz Couselo','','Active','30','2022-12-15 21:50:04','2022-12-15 21:50:04');

INSERT INTO `subjects` VALUES (2,3,4,'72400010001','','','2022-12-15 21:51:18','2022-12-15 21:51:18');
INSERT INTO `subjects` VALUES (3,3,4,'72400010002','Treatment','','2022-12-15 21:51:29','2022-12-15 21:51:29');
INSERT INTO `subjects` VALUES (4,3,4,'72400010003','Dropped Treatment','V1','2022-12-15 21:51:46','2022-12-15 21:51:46');

INSERT INTO `events` VALUES (2,3,4,2,'Issue','Severe headache','','Medium','No','2022-12-15 21:52:28','2022-12-15 21:52:28');


-- users are being created from the application using the Register 
