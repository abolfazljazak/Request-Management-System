import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function SwaggerConfigInit(app: INestApplication) {
  const document = new DocumentBuilder()
  .setTitle("User Management System")
  .setDescription("User Management System API")
  .setVersion("v0.0.1")
  .addBearerAuth()
  .build();
  
  const swaggerDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup("/swagger", app, swaggerDocument);
}

function SwaggerAuthConfig(): SecuritySchemeObject {
  return {
    type: "http",
    bearerFormat: "JWT",
    in: "header",
    scheme: "bearer",
  };
}