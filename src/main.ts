import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ValidationPipe } from "./filters/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Register the HttpExceptionFilter globally
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  config();
  app.setGlobalPrefix("api", {
    exclude: ["health", "metrics"],
  });
  // Enable CORS middleware
  app.enableCors({
    origin: ["http://localhost:4200", "http://64.227.142.105"],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
  await app.listen(4000);
}
bootstrap();
