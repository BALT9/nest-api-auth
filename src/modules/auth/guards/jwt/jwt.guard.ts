// src/modules/auth/guards/jwt.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly tokenBlacklistService: TokenBlacklistService) {
        super();
    }

    handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    if (this.tokenBlacklistService.has(token)) {
      throw new UnauthorizedException('Token inválido o revocado');
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido');
    }

    return user;
  }
}
