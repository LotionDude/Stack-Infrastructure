BEGIN;

CREATE TABLE IF NOT EXISTS users (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS actions (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) UNIQUE NOT NULL,
  "precedence" INT NOT NULL
);

CREATE TABLE IF NOT EXISTS role_permissions (
  "role_id" INT REFERENCES roles(id) ON DELETE CASCADE,
  "action_id" INT REFERENCES actions(id) ON DELETE CASCADE,
  "state" VARCHAR(50) NOT NULL CHECK (state IN ('ENABLE', 'INHERIT', 'DISABLE')) DEFAULT 'INHERIT',
  PRIMARY KEY (role_id, action_id)
);

CREATE TABLE IF NOT EXISTS user_roles (
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "role_id" INT REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

COMMIT;

------ Add default role permissions for each newly added action
BEGIN;

-- Function to add default role permissions
CREATE OR REPLACE FUNCTION add_default_role_permissions()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO role_permissions (role_id, action_id, state)
  SELECT id, NEW.id, 
         CASE 
           WHEN name = 'DEFAULT' THEN 'DISABLE'
           WHEN name = 'ADMIN' THEN 'ENABLE' 
           ELSE 'INHERIT' 
         END
  FROM roles;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to add default role permissions
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'add_default_role_permissions_trigger') THEN
    CREATE TRIGGER add_default_role_permissions_trigger
    AFTER INSERT ON actions
    FOR EACH ROW
    EXECUTE FUNCTION add_default_role_permissions();
  END IF;
END $$;

------ Add default role to newly added users
BEGIN;

-- Create the trigger function
CREATE OR REPLACE FUNCTION add_default_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_roles (user_id, role_id)
  VALUES (NEW.id, (SELECT id FROM roles WHERE name='DEFAULT'));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER add_default_role_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION add_default_role();

COMMIT;