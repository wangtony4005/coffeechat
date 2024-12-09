CREATE TYPE status AS ENUM('Accepted', 'Rejected', 'Pending');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR(100) NOT NULL,
    userType VARCHAR(100) NOT NULL,
    bio TEXT,
    jobTitle VARCHAR(255),
    career_interest VARCHAR(255),
    points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE match(
    menteeEmail VARCHAR(100) NOT NULL,
    mentorEmail VARCHAR(100) NOT NULL,
    matchID INT PRIMARY KEY,
    matchStatus status,
    coffeechatStatus BOOLEAN
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    mentorEmail VARCHAR(255) UNIQUE,
    menteeEmail VARCHAR(255) UNIQUE,
    mentorMessages TEXT[],
    menteeMessages TEXT[],
	roomID BIGINT, 
    timestamps TIMESTAMP[] DEFAULT ARRAY[]::TIMESTAMP[]
);
