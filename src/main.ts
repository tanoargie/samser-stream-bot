import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'debug', 'error', 'verbose'],
  });
  await app.listen(3000);
}
bootstrap();
