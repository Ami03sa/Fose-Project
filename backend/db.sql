CREATE DATABASE IF NOT EXISTS dams;

USE dams;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE, 
    password_hash TEXT
);


DROP TABLE IF EXISTS help_requests;
CREATE TABLE help_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    emergency_type VARCHAR(50) NOT NULL,
    urgency_level VARCHAR(50) NOT NULL,
    help_categories TEXT NOT NULL,  -- Will store comma-separated values
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS pledges;
CREATE TABLE pledges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100) NOT NULL,
    assistance_type VARCHAR(100) NOT NULL,
    quantity_or_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS matches;
CREATE TABLE matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT,
    pledge_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
