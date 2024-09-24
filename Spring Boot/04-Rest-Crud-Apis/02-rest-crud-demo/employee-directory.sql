-- Create database if it doesn't exist
CREATE DATABASE employee_directory;

-- Drop table if it exists
DROP TABLE IF EXISTS employee;

-- Create the employee table
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email VARCHAR(45)
);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, email) VALUES
  ('Leslie', 'Andrews', 'leslie@luv2code.com'),
  ('Emma', 'Baumgarten', 'emma@luv2code.com'),
  ('Avani', 'Gupta', 'avani@luv2code.com'),
  ('Yuri', 'Petrov', 'yuri@luv2code.com'),
  ('Juan', 'Vega', 'juan@luv2code.com');
