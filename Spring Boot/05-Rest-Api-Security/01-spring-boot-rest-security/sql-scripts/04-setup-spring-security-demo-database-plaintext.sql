-- Drop the tables if they already exist
DROP TABLE IF EXISTS employee_directory.authorities;
DROP TABLE IF EXISTS employee_directory.users;

-- Table structure for table `users`
CREATE TABLE employee_directory.users (
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  enabled BOOLEAN NOT NULL,
  PRIMARY KEY (username)
);

-- Inserting data for table `users`
INSERT INTO employee_directory.users (username, password, enabled) 
VALUES 
('john', '{noop}test123', TRUE),
('mary', '{noop}test123', TRUE),
('susan', '{noop}test123', TRUE);

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
