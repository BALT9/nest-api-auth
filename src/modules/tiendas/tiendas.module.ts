import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TiendasService } from './tiendas.service';
import { TiendasController } from './tiendas.controller';
import { Tienda, TiendaSchema } from './schemas/tienda.schema';
import { Producto, ProductoSchema } from '../productos/Schemas/producto.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tienda.name, schema: TiendaSchema },
      { name: Producto.name, schema: ProductoSchema },
    ]),
    UsersModule,
  ],
  controllers: [TiendasController],
  providers: [TiendasService],
  exports: [
    TiendasService,
    MongooseModule, // Exporta MongooseModule para que ProductosModule pueda inyectar TiendaModel
  ],
})
export class TiendasModule {}
