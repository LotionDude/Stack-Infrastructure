import { IsEnum, IsString } from 'class-validator';
import { RoleStateType } from '../types/role-permission-state.type';

export class UpdateRolePermissionState {
  @IsString()
  roleName: string;

  @IsString()
  actionName: string;

  @IsEnum(RoleStateType)
  state: RoleStateType;
}
