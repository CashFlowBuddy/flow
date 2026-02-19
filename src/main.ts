import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    cors: {
      origin: process.env.CORS_ORIGIN?.split(",") ?? "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
