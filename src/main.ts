import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerConfigInit } from "@config/swagger.config";
import { HttpExceptionFilter } from "@modules/api/filters/http-exception.filters";
import { AppModule } from "./modules/app/app.module";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // swagger config
  SwaggerConfigInit(app);

  // exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get("App.port");
  await app.listen(process.env.PORT ?? port);
}
bootstrap();
