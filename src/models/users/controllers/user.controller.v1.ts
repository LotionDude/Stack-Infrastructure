import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { RolePermissionsMapShort } from '@/models/roles/types/role-permission-state.type';
import { RolePermissionsMapFull } from '../types/user-role-permissions.type';
import { IsBoolean } from 'class-validator';
import { ParseBooleanPipe } from '@/common/pipes/boolean.pipe';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Get('/:name/roles')
  @ApiOperation({
    description:
      'Returns all a users roles, ordered from the role with the least precedence to the role with the highest precedence',
  })
  public async getRoles(@Param('name') name: string): Promise<string[]> {
    const user = await this.userService.getUser(name);

    return user.roles.map((role) => role.name);
  }

  @Get('/:name/actions')
  @ApiQuery({ name: 'fullDetail', required: false, type: Boolean })
  public async getActions(
    @Param('name') name: string,
    @Query('fullDetail', new ParseBooleanPipe(false)) fullDetail: boolean,
  ): Promise<RolePermissionsMapShort | RolePermissionsMapFull> {
    const rolePermissionsDictionary =
      await this.userService.getUserRolePermissions(name);

    if (fullDetail) {
      return rolePermissionsDictionary;
    } else {
      return Object.keys(rolePermissionsDictionary).reduce((acc, key) => {
        acc[key] = rolePermissionsDictionary[key].state;
        return acc;
      }, {} as RolePermissionsMapShort);
    }
  }
}
