import { Injectable } from '@nestjs/common';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';

@Injectable()
export class TiendasService {
  create(createTiendaDto: CreateTiendaDto) {
    return 'This action adds a new tienda';
  }

  findAll() {
    return `This action returns all tiendas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tienda`;
  }

  update(id: number, updateTiendaDto: UpdateTiendaDto) {
    return `This action updates a #${id} tienda`;
  }

  remove(id: number) {
    return `This action removes a #${id} tienda`;
  }
}
