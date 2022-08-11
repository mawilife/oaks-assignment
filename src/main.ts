import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './exceptions/validation.exeption';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory() {
      return new ValidationException();
    },
  }));
  console.log(`App running on http://localhost:3000/graphsql`)
  await app.listen(3000);
}
bootstrap();
