enum DefaultRoleStateType {
  'ENABLE' = 'ENABLE',
  'DISABLE' = 'DISABLE',
}

enum RoleStateType {
  'ENABLE' = 'ENABLE',
  'DISABLE' = 'DISABLE',
  'INHERIT' = 'INHERIT',
}

export type RolePermissionsMapShort = { [key: string]: RoleStateType };

export { DefaultRoleStateType, RoleStateType };
