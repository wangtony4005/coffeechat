CREATE TYPE status AS ENUM('Accepted', 'Rejected', 'Pending');

CREATE TABLE IF NOT EXISTS users (
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

CREATE TABLE IF NOT EXISTS match(
    menteeEmail VARCHAR(100) NOT NULL,
    mentorEmail VARCHAR(100) NOT NULL,
    matchID INT PRIMARY KEY,
    matchStatus status,
    coffeechatStatus BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    mentorEmail VARCHAR(255) UNIQUE,
    menteeEmail VARCHAR(255) UNIQUE,
    mentorMessages TEXT[],
    menteeMessages TEXT[],
	roomID BIGINT, 
    timestamps TIMESTAMP[] DEFAULT ARRAY[]::TIMESTAMP[]
);


CREATE TABLE IF NOT EXISTS mochapoints(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    points INT NOT NULL
    

);
