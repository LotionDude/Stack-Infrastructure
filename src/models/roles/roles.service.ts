// permissions.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { RoleStateType } from './types/role-permission-state.type';
import { UpdateRolePermissionState } from './dtos/update-role-permission-state.dto';
import { Role } from './entities/roles.entity';
import { RequiredActions } from '@/common/decorators/metadata/required-actions.decorator';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  public async getRoles(): Promise<Role[]> {
    const roles = await this.roleRepository.find();
    roles.sort((a, b) => a.precedence - b.precedence);
    return roles;
  }

  public async updateRolePermissionState(
    updateRolePermissionState: UpdateRolePermissionState,
  ) {
    const { roleName, actionName, state } = updateRolePermissionState;

    //todo: dont hardcore default.
    if (roleName === 'DEFAULT' && state === RoleStateType.INHERIT) {
      throw new ForbiddenException();
    }

    const rolePermission = await this.rolePermissionRepository
      .createQueryBuilder('rolePermission')
      .innerJoinAndSelect(
        'rolePermission.role',
        'role',
        'role.name = :roleName',
        { roleName },
      )
      .innerJoinAndSelect(
        'rolePermission.action',
        'action',
        'action.name = :actionName',
        { actionName },
      )
      .where('role.name = :roleName', { roleName })
      .andWhere('action.name = :actionName', { actionName })
      .getOne();

    if (!rolePermission) {
      throw new NotFoundException();
    }

    rolePermission.state = state;
    this.rolePermissionRepository.save(rolePermission);
  }

  public async getRolePermissions(name: string): Promise<RolePermission[]> {
    const rolePermissions = await this.rolePermissionRepository
      .createQueryBuilder('rolePermission')
      .innerJoinAndSelect('rolePermission.action', 'action')
      .innerJoin('rolePermission.role', 'role')
      .where('role.name = :roleName', { roleName: name })
      .getMany();

    return rolePermissions;
  }
}
