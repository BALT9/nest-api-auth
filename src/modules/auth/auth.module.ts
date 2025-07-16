import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';  // Importa el módulo de usuarios
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,  // <-- IMPORTANTE para que UsersService esté disponible
    JwtModule.register({
      secret: 'tu_secreto_super_seguro',  // Mejor usar variables de entorno
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
