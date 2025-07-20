import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TiendasService } from './tiendas.service';
import { TiendasController } from './tiendas.controller';
import { Tienda, TiendaSchema } from './schemas/tienda.schema';
import { Producto, ProductoSchema } from '../productos/Schemas/producto.schema';
import { UsersModule } from '../users/users.module'; // Importa el módulo Users

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tienda.name, schema: TiendaSchema },
      { name: Producto.name, schema: ProductoSchema },
    ]),
    UsersModule, // <--- Aquí importas el módulo que provee UserModel
  ],
  controllers: [TiendasController],
  providers: [TiendasService],
})
export class TiendasModule {}
