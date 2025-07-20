import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';          // <--- Importa MongooseModule
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto, ProductoSchema } from './Schemas/producto.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }]),
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule { }
