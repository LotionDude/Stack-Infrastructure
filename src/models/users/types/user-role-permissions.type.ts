import { RoleStateType } from '@/models/roles/types/role-permission-state.type';

export interface RolePermissionsMapFull {
  [key: string]: {
    state: RoleStateType;
    grantingRole: string;
  };
}
