import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto, ProductoDocument } from './Schemas/producto.schema';


import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Tienda, TiendaDocument } from '../tiendas/schemas/tienda.schema';
import { TiendasService } from '../tiendas/tiendas.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<ProductoDocument>,
    @InjectModel(Tienda.name) private tiendaModel: Model<TiendaDocument>,
    private readonly tiendasService: TiendasService,
  ) { }

  async create(createProductoDto: CreateProductoDto, userId: string): Promise<Producto> {
    const tienda = await this.tiendasService.findByOwnerId(userId);

    const nuevoProducto = new this.productoModel({
      ...createProductoDto,
      store: tienda._id,
    });

    const productoGuardado = await nuevoProducto.save();

    // Actualizar la tienda para incluir este producto
    tienda.products.push(productoGuardado._id);
    await tienda.save();

    return productoGuardado;
  }


  async findAll(userId: string): Promise<Producto[]> {
    const tienda = await this.tiendasService.findByOwnerId(userId);
    return this.productoModel.find({ store: tienda._id }).populate('store').exec();
  }


  async findOne(id: string): Promise<Producto> {
    const producto = await this.productoModel.findById(id).populate('store').exec();
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const actualizado = await this.productoModel
      .findByIdAndUpdate(id, updateProductoDto, { new: true })
      .exec();

    if (!actualizado) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return actualizado;
  }

  async remove(id: string): Promise<Producto> {
    const eliminado = await this.productoModel.findByIdAndDelete(id).exec();

    if (!eliminado) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return eliminado;
  }
}
