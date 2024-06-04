// permissions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { Role } from '../roles/entities/roles.entity';
import { RolePermission } from '../roles/entities/role-permission.entity';
import { RoleStateType } from '../roles/types/role-permission-state.type';
import { RolePermissionsMapFull } from './types/user-role-permissions.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getUser(name: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { name: name },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException();
    }

    user.roles.sort((a, b) => a.precedence - b.precedence);

    return user;
  }

  public async getUserRolePermissions(
    name: string,
  ): Promise<RolePermissionsMapFull> {
    const user = await this.userRepository.findOne({
      where: { name: name },
      relations: ['roles.rolePermissions.action'],
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.prioritizeUserRolePermissions(user.roles);
  }

  private prioritizeUserRolePermissions(roles: Role[]): RolePermissionsMapFull {
    const sortedRoles: Role[] = roles.sort(
      (a, b) => b.precedence - a.precedence,
    );

    return sortedRoles.reduce((acc, role) => {
      role.rolePermissions.forEach((rp) => {
        if (this.shouldReplaceRolePermissions(acc, rp)) {
          acc[rp.action.name] = { state: rp.state, grantingRole: role.name };
        }
      });
      return acc;
    }, {} as RolePermissionsMapFull);
  }

  private shouldReplaceRolePermissions(
    roleDictionary: RolePermissionsMapFull,
    rolePermission: RolePermission,
  ): boolean {
    const actionName = rolePermission.action.name;
    return (
      !roleDictionary[actionName] ||
      roleDictionary[actionName].state === RoleStateType.INHERIT
    );
  }
}
