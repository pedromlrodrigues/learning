-- Drop the 'student' table if it exists
DROP TABLE IF EXISTS student;

-- Create the 'student' table
CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email VARCHAR(45)
);

-- In PostgreSQL, SERIAL generates a sequence for the autoincrement (student_id_seq, in this case).