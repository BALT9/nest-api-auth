import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TiendasService } from './tiendas.service';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';

@Controller('tiendas')
@UseGuards(JwtAuthGuard)
export class TiendasController {
  constructor(private readonly tiendasService: TiendasService) { }

  @Post()
  create(@Body() createTiendaDto: CreateTiendaDto, @Req() req: any) {
    const ownerId = req.user._id;
    return this.tiendasService.create(createTiendaDto, ownerId);
  }

  @Get()
  async findMyTienda(@Req() req: any) {
    const userId = req.user._id;
    console.log(userId);
    return this.tiendasService.findByOwnerId(userId);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiendasService.findOne(id); // ya no uses +id
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiendaDto: UpdateTiendaDto) {
    return this.tiendasService.update(id, updateTiendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiendasService.remove(id);
  }
}
