BEGIN;

-- Insert default roles
INSERT INTO roles (name, precedence) VALUES
('DEFAULT', 0),
('ADMIN', 1);


-- Insert default users
INSERT INTO users(name) VALUES
('test:default'),
('test:admin');

-- Insert default actions
INSERT INTO actions (name) VALUES
('VIEW_PERMISSIONS'),
('MANAGE_PERMISSIONS'),
('MANAGE_META_TAGS'),
('MANAGE_USER_TAGS'),
('MANAGE_OTHER_MESSAGES'),
('MANAGE_OTHER_PROFILE'),
('EDIT_BANNER'),

('UPLOAD_POST'),
('UPLOAD_COMMENT'),
('LIKE_POST'),
('LIKE_COMMENT'),
('MANAGE_SELF_MESSAGES'),
('MANAGE_SELF_PROFILE');

-- Insert default role permissions
UPDATE role_permissions
SET state = 'ENABLE'
WHERE
	role_id = (SELECT id FROM roles WHERE name='DEFAULT') AND
	action_id in (
		(SELECT id FROM actions WHERE name='UPLOAD_POST'),
		(SELECT id FROM actions WHERE name='UPLOAD_COMMENT'),
		(SELECT id FROM actions WHERE name='LIKE_POST'),
		(SELECT id FROM actions WHERE name='LIKE_COMMENT'),
		(SELECT id FROM actions WHERE name='MANAGE_SELF_MESSAGES'),
		(SELECT id FROM actions WHERE name='MANAGE_SELF_PROFILE')
	)
;

-- Insert default user roles
INSERT INTO user_roles (user_id, role_id) VALUES 
((SELECT id FROM users WHERE name='test:admin'), (SELECT id FROM roles WHERE name='ADMIN'));


COMMIT;