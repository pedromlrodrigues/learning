-- Drop the tables if they already exist
DROP TABLE IF EXISTS employee_directory.authorities;
DROP TABLE IF EXISTS employee_directory.users;

-- Table structure for table `users`
CREATE TABLE employee_directory.users (
  username VARCHAR(50) NOT NULL,
  password CHAR(68) NOT NULL,  -- BCrypt password requires 60-68 characters
  enabled BOOLEAN NOT NULL,
  PRIMARY KEY (username)
);

-- Inserting data for table `users`
-- The passwords are encrypted using BCrypt (as indicated by the {bcrypt} prefix)
-- Default passwords here are: fun123

INSERT INTO employee_directory.users (username, password, enabled) 
VALUES 
('john', '{bcrypt}$2a$10$qeS0HEh7urweMojsnwNAR.vcXJeXR1UcMRZ2WcGQl9YeuspUdgF.q', TRUE),
('mary', '{bcrypt}$2a$10$qeS0HEh7urweMojsnwNAR.vcXJeXR1UcMRZ2WcGQl9YeuspUdgF.q', TRUE),
('susan', '{bcrypt}$2a$10$qeS0HEh7urweMojsnwNAR.vcXJeXR1UcMRZ2WcGQl9YeuspUdgF.q', TRUE);

-- Table structure for table `authorities`
CREATE TABLE employee_directory.authorities (
  username VARCHAR(50) NOT NULL,
  authority VARCHAR(50) NOT NULL,
  CONSTRAINT authorities_unique UNIQUE (username, authority),
  CONSTRAINT fk_authorities_username FOREIGN KEY (username) REFERENCES users (username)
);

-- Inserting data for table `authorities`
INSERT INTO employee_directory.authorities (username, authority) 
VALUES 
('john', 'ROLE_EMPLOYEE'),
('mary', 'ROLE_EMPLOYEE'),
('mary', 'ROLE_MANAGER'),
('susan', 'ROLE_EMPLOYEE'),
('susan', 'ROLE_MANAGER'),
('susan', 'ROLE_ADMIN');
