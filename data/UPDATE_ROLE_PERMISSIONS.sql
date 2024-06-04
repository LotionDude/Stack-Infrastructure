UPDATE role_permissions
SET state = 'INHERIT'
WHERE role_permissions.action_id = (SELECT actions.id FROM actions WHERE actions.name = 'MANAGE_PROFILE') AND
      role_permissions.role_id = (SELECT roles.id FROM roles WHERE roles.name = 'MUTED');
