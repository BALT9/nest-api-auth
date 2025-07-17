import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModuleRef } from '@nestjs/core';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private tokenBlacklistService: TokenBlacklistService;

  constructor(private moduleRef: ModuleRef) {
    super();
    // Obtener el servicio de forma síncrona
    this.tokenBlacklistService = this.moduleRef.get(TokenBlacklistService, { strict: false });
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    if (this.tokenBlacklistService.has(token)) {
      throw new UnauthorizedException('Token inválido o revocado');
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido');
    }
    return user;
  }
}
