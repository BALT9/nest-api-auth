import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiendasService } from './tiendas.service';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';

@Controller('tiendas')
export class TiendasController {
  constructor(private readonly tiendasService: TiendasService) {}

  @Post()
  create(@Body() createTiendaDto: CreateTiendaDto) {
    return this.tiendasService.create(createTiendaDto);
  }

  @Get()
  findAll() {
    return this.tiendasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiendasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiendaDto: UpdateTiendaDto) {
    return this.tiendasService.update(+id, updateTiendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiendasService.remove(+id);
  }
}
