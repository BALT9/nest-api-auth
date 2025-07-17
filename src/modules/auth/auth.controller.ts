import { Body, Controller, Post, Get, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

import { TokenBlacklistService } from './guards/jwt/token-blacklist.service';
import { JwtAuthGuard } from './guards/jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) { }

  @Post('login')
  login(@Body() datos: { email: string; password: string }) {
    return this.authService.login(datos.email, datos.password);
  }

  @Post('register')
  register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }


  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    this.tokenBlacklistService.add(token);
    return { message: 'Logout exitoso, token invalidado' };
  }
}
