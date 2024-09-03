-- Now create user with a password
CREATE USER springstudent WITH PASSWORD 'springstudent';

-- Grant all privileges on all schemas and tables
GRANT ALL PRIVILEGES ON SCHEMA public TO springstudent;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO springstudent;

-- Grant privileges for future tables as well
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO springstudent;
