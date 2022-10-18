import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // solo deja la data del body que estoy esperando de acuerdo a mi DTO, cualquier otra data se omite
      forbidNonWhitelisted: true // manda un error si es que el body del request tiene datos que no corresponden al DTO
    })
  )

  await app.listen(3000);
}
bootstrap();
