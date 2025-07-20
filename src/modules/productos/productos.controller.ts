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
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto, @Req() req: any) {
    const userId = req.user._id;
    return this.productosService.create(createProductoDto, userId);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user._id;
    return this.productosService.findAll(userId);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id); // ✅ usar string (ObjectId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto); // ✅ usar string
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id); // ✅ usar string
  }
}
