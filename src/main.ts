import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global
  app.setGlobalPrefix('api');

  // Validación global
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: false,
  });

  // ⚙️ Swagger config
  const config = new DocumentBuilder()
    .setTitle('API JWT')
    .setDescription('Documentación de la API NestJS con autenticación')
    .setVersion('1.0')
    .addBearerAuth() // Para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // http://localhost:4000/api/docs

  // Puerto de escucha
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
