CREATE TYPE status AS ENUM('Accepted', 'Rejected', 'Pending')

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    userType VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentee {
    menteeEmail VARCHAR(100) NOT NULL,
    major VARCHAR(100) NOT NULL,
    school VARCHAR(100) NOT NULL,
    gradeLevel VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};

CREATE TABLE mentor {
    mentorEmail VARCHAR(100) NOT NULL,
    companyName VARCHAR(100) NOT NULL,
    jobTitle VARCHAR(255) NOT NULL,
    industry VARCHAR(255) NOT NULL.
    yearsOfExperience INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};

CREATE TABLE match{
    menteeEmail VARCHAR(100) NOT NULL,
    mentorEmail VARCHAR(100) NOT NULL,
    matchID INT NOT NULL,
    matchStatus status,
}