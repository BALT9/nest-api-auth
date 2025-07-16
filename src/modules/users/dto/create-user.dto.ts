import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
