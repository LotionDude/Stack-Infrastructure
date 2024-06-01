import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from '@/models/roles/entities/roles.entity';
import { User } from './user';

@Entity({ name: 'user_roles' })
export class UserRoles {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'role_id' })
  roleId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;
}
