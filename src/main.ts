import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory() {
      return new ValidationException();
    },
  }));
  const port = Number(process.env.port) || 3000;
  console.log(`App running on http://localhost:${port}/graphsql`)
  await app.listen(port);
}
bootstrap();
