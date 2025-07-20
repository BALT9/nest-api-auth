import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';          // <--- Importa MongooseModule
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto, ProductoSchema } from './Schemas/producto.schema';
import { TiendasModule } from '../tiendas/tiendas.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }]),
    TiendasModule
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule { }
