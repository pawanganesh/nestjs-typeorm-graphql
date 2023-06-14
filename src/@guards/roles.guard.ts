import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the roles from the decorator
    const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()]);

    // If no required role is set, just return true
    if (!requiredRole) return true;
    // Get the context
    const ctx = GqlExecutionContext.create(context);
    // Get the user from the request
    const { user } = ctx.getContext().req;

    // Return true if the user has the correct role
    return requiredRole.some((role) => user.role?.includes(role));
  }
}
