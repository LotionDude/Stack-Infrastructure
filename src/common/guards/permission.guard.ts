import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequiredActions } from '../decorators/metadata/required-actions.decorator';
import { UserService } from '@/models/users/user.service';
import { RoleStateType } from '@/models/roles/types/role-permission-state.type';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredActions = this.reflector.getAllAndMerge(RequiredActions, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requestingUser = context.switchToHttp().getRequest().headers.username;

    if (!requiredActions || requiredActions.length === 0) {
      return true;
    } else if (requestingUser === undefined) {
      return false;
    }

    const userActions =
      await this.userService.getUserRolePermissions(requestingUser);

    console.log(requestingUser);
    console.log(userActions);

    return (
      userActions !== undefined &&
      requiredActions.filter(
        (actionName) => userActions[actionName].state === RoleStateType.DISABLE,
      ).length !== 0
    );
  }
}
