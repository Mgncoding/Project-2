DROP DATABASE [IF EXISTS] project2_db;
CREATE DATABASE project2_db;
USE project2_db;

-- Create the table wishes.
CREATE TABLE customers
(
`customerId` int NOT NULL AUTO_INCREMENT,
`firstName` varchar(50) NOT NULL,
`lastName` varchar(50) NOT NULL,
`phone` varchar(20) NOT NULL,
`email` varchar(255) NOT NULL,
`postalCode` varchar(15) NOT NULL,
`city` varchar(50) NOT NULL,
`state` varchar(50) NOT NULL,
`country` varchar(50), NOT NULL
`addressLine1` varchar(50), NOT NUll
`addressLine2` varchar(50),
PRIMARY KEY (id)
);




