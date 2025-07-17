import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';        // Importa PassportModule
import { JwtStrategy } from './guards/jwt/jwt.strategy';           // Importa la estrategia JWT
import { TokenBlacklistService } from './guards/jwt/token-blacklist.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,   // <-- necesario para usar guards basados en Passport
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro', // mejor usar variables de entorno
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenBlacklistService],  // <-- agrega JwtStrategy aquí
})
export class AuthModule {}
