import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TiendasModule } from './tiendas/tiendas.module';
import { TiendasModule } from './modules/tiendas/tiendas.module';
import { ProductosModule } from './modules/productos/productos.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://admin:1234567890@cluster0.vgbrok7.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0'),
    TiendasModule,
    ProductosModule
  ],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}

