// src/modules/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token de la cabecera Authorization: Bearer <token>
      secretOrKey: process.env.JWT_SECRET || 'tu_secreto_super_seguro',  // Clave para validar el token
    });
  }

  async validate(payload: any) {
    // Aquí defines qué devolver si el token es válido
    // Payload es el contenido del token decodificado
    return { userId: payload.sub, email: payload.email };
  }
}
