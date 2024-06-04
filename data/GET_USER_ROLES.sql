SELECT users.name, roles.name
FROM users
INNER JOIN user_roles ON users.id = user_roles.user_id
INNER JOIN roles ON user_roles.role_id = roles.id

;