import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    // const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // if (!requireRoles) {
    //   return true;
    // }
    // const { user } = context.switchToHttp().getRequest();

    // return requireRoles.some((role) => user.roles?.includes(role));
    return true;
  }
}
