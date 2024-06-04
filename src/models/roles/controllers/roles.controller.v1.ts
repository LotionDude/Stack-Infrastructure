import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { RolesService } from '../roles.service';
import { UpdateRolePermissionState } from '../dtos/update-role-permission-state.dto';
import {
  RolePermissionsMapShort,
  RoleStateType,
} from '../types/role-permission-state.type';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequiredActions } from '@/common/decorators/metadata/required-actions.decorator';

@ApiTags('Roles')
@RequiredActions(['VIEW_PERMISSIONS'])
@Controller({ path: 'roles', version: '1' })
export class RolesControllerV1 {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all roles',
    description:
      'Returns all role names, ordered from the role with the least precedence to the role with the highest precedence',
  })
  public async getAllRoles(): Promise<string[]> {
    return (await this.rolesService.getRoles()).map((role) => role.name);
  }

  @Get('/:name')
  @ApiOperation({ summary: 'Get a list of role permissions.' })
  public async getRolePermissions(
    @Param('name') name: string,
  ): Promise<RolePermissionsMapShort> {
    return (await this.rolesService.getRolePermissions(name)).reduce(
      (acc, rp) => {
        acc[rp.action.name] = rp.state;
        return acc;
      },
      {} as { [key: string]: RoleStateType },
    );
  }

  @Put('/state')
  @ApiOperation({ summary: 'Update the state of a role permission.' })
  public async updateState(
    @Body() updateRolePermissionStateDto: UpdateRolePermissionState,
  ): Promise<void> {
    await this.rolesService.updateRolePermissionState(
      updateRolePermissionStateDto,
    );
  }
}
