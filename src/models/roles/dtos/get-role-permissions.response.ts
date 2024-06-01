import { RoleStateType } from '../types/role-permission-state.type';

export interface GetRolePermissionsResponse {
  actionName: string;
  state: RoleStateType;
}
