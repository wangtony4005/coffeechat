CREATE TYPE status AS ENUM('Accepted', 'Rejected', 'Pending')

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    userType VARCHAR(100) NOT NULL,
    points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentee {
    menteeEmail VARCHAR(100) NOT NULL,
    major VARCHAR(100),
    school VARCHAR(100),
    gradeLevel VARCHAR(100),
    career_interests TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};

CREATE TABLE mentor {
    mentorEmail VARCHAR(100),
    bio TEXT,
    jobTitle VARCHAR(255),
    career_interest VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};

CREATE TABLE match{
    menteeEmail VARCHAR(100) NOT NULL,
    mentorEmail VARCHAR(100) NOT NULL,
    matchID INT NOT NULL,
    matchStatus status,
    coffeechatStatus BOOLEAN
}

CREATE TABLE messages {
    message_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE,
    messages TEXT[] DEFAULT ARRAY[]::TEXT[],
    FOREIGN KEY (matchID) REFERENCES match(matchID) ON DELETE CASCADE
    timestamps TIMESTAMP[] DEFAULT ARRAY[]::TIMESTAMP[], 
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
};
