import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(req);
      if (!token) {
        throw new UnauthorizedException('Требуется авторизация');
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => requiredRoles.includes(role.name));
    } catch (e) {
      throw new HttpException(
        'У пользователя нет доступа',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
