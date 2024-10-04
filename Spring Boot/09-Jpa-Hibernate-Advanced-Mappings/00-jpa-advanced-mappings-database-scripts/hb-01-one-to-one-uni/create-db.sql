-- Drop schema if it exists and create a new schema
DROP SCHEMA IF EXISTS "hb-01-one-to-one-uni" CASCADE;
CREATE SCHEMA "hb-01-one-to-one-uni";
SET search_path TO "hb-01-one-to-one-uni";

CREATE TABLE instructor_detail (
  id SERIAL PRIMARY KEY,  -- SERIAL is used for auto-increment in PostgreSQL
  youtube_channel VARCHAR(128),
  hobby VARCHAR(45)
);

-- Create the `instructor` table
CREATE TABLE instructor (
  id SERIAL PRIMARY KEY,  -- SERIAL for auto-incrementing ID
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email VARCHAR(45),
  instructor_detail_id INT,
  CONSTRAINT fk_instructor_detail
    FOREIGN KEY (instructor_detail_id)
    REFERENCES instructor_detail (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);