import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post()
    funlogin(@Body() datos: Record<string, any>){
        return this.authService.login(datos.email, datos.password);
    }
}
