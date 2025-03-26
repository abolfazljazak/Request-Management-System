import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";
import { AppModule } from "./modules/app/app.module";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("App.port");
  await app.listen(process.env.PORT ?? port);
}
bootstrap();
