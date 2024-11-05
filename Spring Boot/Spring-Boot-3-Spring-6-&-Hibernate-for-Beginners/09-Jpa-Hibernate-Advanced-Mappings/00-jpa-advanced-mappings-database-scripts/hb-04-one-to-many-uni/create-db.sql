-- Drop the schema if it exists
DROP SCHEMA IF EXISTS "hb-04-one-to-many-uni" CASCADE;

-- Create the schema
CREATE SCHEMA "hb-04-one-to-many-uni";
SET search_path TO "hb-04-one-to-many-uni";

-- Create `instructor_detail` table
CREATE TABLE instructor_detail (
  id SERIAL PRIMARY KEY,  -- SERIAL for auto-incrementing ID
  youtube_channel VARCHAR(128),
  hobby VARCHAR(45)
);

-- Create `instructor` table
CREATE TABLE instructor (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email VARCHAR(45),
  instructor_detail_id INT,
  CONSTRAINT fk_detail FOREIGN KEY (instructor_detail_id) 
    REFERENCES instructor_detail (id) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION
);

-- Create `course` table
CREATE TABLE course (
  id SERIAL PRIMARY KEY,
  title VARCHAR(128) UNIQUE,
  instructor_id INT,
  CONSTRAINT fk_instructor FOREIGN KEY (instructor_id) 
    REFERENCES instructor (id)
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION
);

-- Create `review` table
CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  comment VARCHAR(256),
  course_id INT,
  CONSTRAINT fk_course FOREIGN KEY (course_id)
    REFERENCES course (id)
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION
);

-- PostgreSQL enforces foreign key constraints by default, so no need to disable and enable foreign key checks like in MySQL.
