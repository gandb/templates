CREATE DATABASE brainandbones;
USE brainandbones;
CREATE USER 'brainandbones'@'%' IDENTIFIED BY 'PWS';
GRANT ALL PRIVILEGES  ON `brainandbones`.* TO 'brainandbones'@'%' WITH GRANT OPTION; 
FLUSH PRIVILEGES;