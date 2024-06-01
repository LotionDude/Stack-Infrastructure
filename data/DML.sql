BEGIN;

-- Insert default users
INSERT INTO users(name) VALUES
('test:default'),
('test:admin');

-- Insert default actions
INSERT INTO actions (name) VALUES
('MANAGE_META_TAGS'),
('MANAGE_MESSAGES'),
('MANAGE_OTHER_MESSAGES'),
('MANAGE_PROFILE'),
('MANAGE_OTHER_PROFILE'),
('EDIT_BANNER');

-- Insert default roles
INSERT INTO roles (name, precedence) VALUES
('DEFAULT', 0),
('ADMIN', 1);

-- Insert default role permissions
INSERT INTO role_permissions (role_id, action_id, state) VALUES 
((SELECT id FROM roles WHERE name='DEFAULT'), (SELECT id FROM actions WHERE name='MANAGE_META_TAGS'), 'DISABLE'),
((SELECT id FROM roles WHERE name='DEFAULT'), (SELECT id FROM actions WHERE name='MANAGE_OTHER_MESSAGES'), 'DISABLE'),
((SELECT id FROM roles WHERE name='DEFAULT'), (SELECT id FROM actions WHERE name='MANAGE_MESSAGES'), 'DISABLE'),
((SELECT id FROM roles WHERE name='DEFAULT'), (SELECT id FROM actions WHERE name='MANAGE_PROFILE'), 'DISABLE'),
((SELECT id FROM roles WHERE name='DEFAULT'), (SELECT id FROM actions WHERE name='MANAGE_OTHER_PROFILE'), 'DISABLE'),
((SELECT id FROM roles WHERE name='DEFAULT'), (SELECT id FROM actions WHERE name='EDIT_BANNER'), 'DISABLE'),

((SELECT id FROM roles WHERE name='ADMIN'), (SELECT id FROM actions WHERE name='MANAGE_META_TAGS'), 'ENABLE'),
((SELECT id FROM roles WHERE name='ADMIN'), (SELECT id FROM actions WHERE name='MANAGE_OTHER_MESSAGES'), 'ENABLE'),
((SELECT id FROM roles WHERE name='ADMIN'), (SELECT id FROM actions WHERE name='MANAGE_MESSAGES'), 'ENABLE'),
((SELECT id FROM roles WHERE name='ADMIN'), (SELECT id FROM actions WHERE name='MANAGE_PROFILE'), 'ENABLE'),
((SELECT id FROM roles WHERE name='ADMIN'), (SELECT id FROM actions WHERE name='MANAGE_OTHER_PROFILE'), 'ENABLE'),
((SELECT id FROM roles WHERE name='ADMIN'), (SELECT id FROM actions WHERE name='EDIT_BANNER'), 'ENABLE');

-- Insert default user roles
INSERT INTO user_roles (user_id, role_id) VALUES 
((SELECT id FROM users WHERE name='test:default'), (SELECT id FROM roles WHERE name='DEFAULT')),
((SELECT id FROM users WHERE name='test:admin'), (SELECT id FROM roles WHERE name='ADMIN')),
((SELECT id FROM users WHERE name='test:admin'), (SELECT id FROM roles WHERE name='DEFAULT'));


COMMIT;