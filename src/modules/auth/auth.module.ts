import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';        // Importa PassportModule
import { JwtStrategy } from './jwt.strategy';           // Importa la estrategia JWT

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
  providers: [AuthService, JwtStrategy],  // <-- agrega JwtStrategy aquí
})
export class AuthModule {}
