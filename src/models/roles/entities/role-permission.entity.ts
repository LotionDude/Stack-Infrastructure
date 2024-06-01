import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './roles.entity';
import { Action } from '../../actions/entities/action.entity';
import { RoleStateType } from '../types/role-permission-state.type';

@Entity({ name: 'role_permissions' })
export class RolePermission {
  @PrimaryColumn({ name: 'role_id' })
  roleId: number;

  @PrimaryColumn({ name: 'action_id' })
  actionId: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Action, (action) => action.id)
  @JoinColumn({ name: 'action_id' })
  action: Action;

  @Column({ default: 'INHERIT' })
  state: RoleStateType;
}
