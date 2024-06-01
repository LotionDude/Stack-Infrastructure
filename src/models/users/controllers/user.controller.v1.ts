import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';

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
}
