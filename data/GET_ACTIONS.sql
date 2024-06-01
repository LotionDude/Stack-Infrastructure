SELECT roles.name,  actions.name, role_permissions.state
FROM roles
INNER JOIN role_permissions ON roles.id = role_permissions.role_id
INNER JOIN actions ON role_permissions.action_id = actions.id
WHERE actions.name = 'MANAGE_USER_TAGS'

;