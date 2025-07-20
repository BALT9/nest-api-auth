import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTiendaDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
