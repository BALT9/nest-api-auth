import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// dto 
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() datos: { email: string; password: string }) {
    return this.authService.login(datos.email, datos.password);
  }

  @Post('register')
  register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }
}
