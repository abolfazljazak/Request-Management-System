import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./modules/app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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
  const config = new DocumentBuilder()
    .setTitle("User Management System")
    .setDescription("User Management System API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = configService.get("App.port");
  await app.listen(process.env.PORT ?? port);
}
bootstrap();
