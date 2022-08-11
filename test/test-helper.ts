import { ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ValidationException } from "../src/exceptions/validation.exception";
import { AppModule } from "../src/app.module";

export async function createTestingApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory() {
      return new ValidationException();
    },
  }));

  return app;
}