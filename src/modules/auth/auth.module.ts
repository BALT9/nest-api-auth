import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';        // Importa PassportModule
import { JwtStrategy } from './guards/jwt/jwt.strategy';           // Importa la estrategia JWT
import { TokenBlacklistService } from './guards/jwt/token-blacklist.service';
import { JwtAuthGuard } from './guards/jwt/jwt.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    TokenBlacklistService,
    // JwtAuthGuard NO aquí
  ],
  exports: [
    TokenBlacklistService, // exporta solo el servicio, no el guard
  ],
})
export class AuthModule {}

