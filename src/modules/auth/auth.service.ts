import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';  // IMPORTANTE
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,  // INYECTADO
        private jwtService: JwtService,
    ) { }

    async register(createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new BadRequestException('El email ya está registrado');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const user = await this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
        });

        const payload = { email: user.email, sub: user._id };
        const access_token = this.jwtService.sign(payload);

        return { user, access_token };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new BadRequestException('Credenciales inválidas');
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            throw new BadRequestException('Credenciales inválidas');
        }

        const plainUser = user.toObject(); // <--- convierte el documento de Mongoose a un objeto plano
        const payload = { email: plainUser.email, sub: plainUser._id };
        const access_token = this.jwtService.sign(payload);

        const { password: _, ...userWithoutPassword } = plainUser;

        return {
            user: userWithoutPassword,
            access_token,
        };
    }


}
