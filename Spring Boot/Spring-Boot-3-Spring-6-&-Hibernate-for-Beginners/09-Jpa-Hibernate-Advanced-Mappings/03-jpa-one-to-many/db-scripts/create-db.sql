-- Drop the schema if it exists
DROP SCHEMA IF EXISTS "hb-03-one-to-many" CASCADE;

-- Create the schema
CREATE SCHEMA "hb-03-one-to-many";
SET search_path TO "hb-03-one-to-many";

-- Create `instructor_detail` table
CREATE TABLE instructor_detail (
  id SERIAL PRIMARY KEY,  -- SERIAL is used for auto-increment
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
